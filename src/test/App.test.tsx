import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { STORAGE_KEY } from "../taskStorage";

afterEach(() => vi.restoreAllMocks());

async function add(title: string) {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Task title"), title);
  await user.click(screen.getByRole("button", { name: "Add task" }));
  return user;
}

function failWrites() {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("quota");
  });
}

describe("App", () => {
  it("shows the empty state", () => {
    render(<App />);
    expect(screen.getByText(/No tasks yet/)).toBeInTheDocument();
  });

  it("adds a trimmed task, clears the input and persists it", async () => {
    render(<App />);
    await add("  Buy milk  ");
    expect(screen.getByRole("checkbox", { name: "Buy milk" })).not.toBeChecked();
    expect(screen.getByLabelText("Task title")).toHaveValue("");
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toHaveLength(1);
  });

  it("rejects blank titles with a message and adds nothing", async () => {
    render(<App />);
    await add("   ");
    expect(screen.getByRole("alert")).toHaveTextContent(/Enter a task title/);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });

  it("accepts 80 characters and rejects 81 keeping the input", async () => {
    render(<App />);
    await add("a".repeat(81));
    expect(screen.getByRole("alert")).toHaveTextContent(/80 characters/);
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Task title")).toHaveValue("a".repeat(81));
  });

  it("accepts an 80 character title", async () => {
    render(<App />);
    await add("a".repeat(80));
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  });

  it("submits with the Enter key", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("Task title"), "Keyboard{Enter}");
    expect(screen.getByRole("checkbox", { name: "Keyboard" })).toBeInTheDocument();
  });

  it("supports keyboard navigation and toggling with the Space key", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.tab();
    expect(screen.getByLabelText("Task title")).toHaveFocus();
    await user.keyboard("Keys{Enter}");
    await user.tab();
    await user.tab();
    const box = screen.getByRole("checkbox", { name: "Keys" });
    expect(box).toHaveFocus();
    await user.keyboard(" ");
    expect(box).toBeChecked();
  });

  it("keeps duplicate tasks independent", async () => {
    render(<App />);
    const user = await add("Same");
    await user.type(screen.getByLabelText("Task title"), "Same");
    await user.click(screen.getByRole("button", { name: "Add task" }));
    const boxes = screen.getAllByRole("checkbox", { name: "Same" });
    await user.click(boxes[0]);
    expect(boxes[0]).toBeChecked();
    expect(boxes[1]).not.toBeChecked();
  });

  it("completes and undoes a task with a visible Done indicator", async () => {
    render(<App />);
    const user = await add("Task");
    const box = screen.getByRole("checkbox", { name: "Task" });
    await user.click(box);
    expect(box).toBeChecked();
    expect(screen.getByText("Done")).toBeInTheDocument();
    await user.click(box);
    expect(box).not.toBeChecked();
    expect(screen.queryByText("Done")).not.toBeInTheDocument();
  });

  it("restores saved tasks and completion state on load", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: "1", title: "Saved", completed: true }]),
    );
    render(<App />);
    expect(screen.getByRole("checkbox", { name: "Saved" })).toBeChecked();
  });

  it("keeps the list and typed title when saving a new task fails", async () => {
    render(<App />);
    const user = await add("First");
    failWrites();
    await user.type(screen.getByLabelText("Task title"), "Second");
    await user.click(screen.getByRole("button", { name: "Add task" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/Could not save/);
    expect(screen.getByLabelText("Task title")).toHaveValue("Second");
    expect(screen.getAllByRole("checkbox")).toHaveLength(1);
  });

  it("keeps completion state when saving a toggle fails", async () => {
    render(<App />);
    const user = await add("Task");
    failWrites();
    const box = screen.getByRole("checkbox", { name: "Task" });
    await user.click(box);
    expect(screen.getByRole("alert")).toHaveTextContent(/Could not save/);
    expect(box).not.toBeChecked();
  });

  describe("unreadable saved data", () => {
    function setup() {
      localStorage.setItem(STORAGE_KEY, "{broken");
      render(<App />);
    }

    it("shows recovery, blocks adding and leaves data untouched", () => {
      setup();
      expect(screen.getByRole("alert")).toHaveTextContent(/could not be read/);
      expect(screen.getByRole("button", { name: "Add task" })).toBeDisabled();
      expect(localStorage.getItem(STORAGE_KEY)).toBe("{broken");
    });

    it("cancelling the reset keeps the data", async () => {
      setup();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Reset saved tasks" }));
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(localStorage.getItem(STORAGE_KEY)).toBe("{broken");
      expect(screen.getByRole("button", { name: "Reset saved tasks" })).toBeInTheDocument();
    });

    it("confirming the reset clears the data and re-enables the app", async () => {
      setup();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Reset saved tasks" }));
      expect(localStorage.getItem(STORAGE_KEY)).toBe("{broken");
      await user.click(screen.getByRole("button", { name: "Confirm reset" }));
      expect(localStorage.getItem(STORAGE_KEY)).toBe("[]");
      expect(screen.getByRole("button", { name: "Add task" })).toBeEnabled();
      expect(screen.getByText(/No tasks yet/)).toBeInTheDocument();
    });

    it("stays in recovery when the reset write fails", async () => {
      setup();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button", { name: "Reset saved tasks" }));
      failWrites();
      await user.click(screen.getByRole("button", { name: "Confirm reset" }));
      expect(screen.getByText(/Could not reset/)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Add task" })).toBeDisabled();
    });
  });
});
