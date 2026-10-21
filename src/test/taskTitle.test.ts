import { describe, expect, it } from "vitest";
import { validateTitle } from "../taskTitle";

describe("validateTitle", () => {
  it("accepts a valid title", () => {
    expect(validateTitle("Buy milk")).toEqual({ ok: true, title: "Buy milk" });
  });

  it("rejects empty, whitespace-only and tab-only titles", () => {
    for (const raw of ["", "   ", "\t\t", " \t "]) {
      expect(validateTitle(raw).ok).toBe(false);
    }
  });

  it("trims leading and trailing whitespace", () => {
    expect(validateTitle("  Walk dog \t")).toEqual({ ok: true, title: "Walk dog" });
  });

  it("accepts exactly 80 characters and rejects 81", () => {
    expect(validateTitle("a".repeat(80)).ok).toBe(true);
    expect(validateTitle("a".repeat(81)).ok).toBe(false);
  });

  it("measures the limit after trimming", () => {
    expect(validateTitle(`  ${"a".repeat(80)}  `).ok).toBe(true);
    expect(validateTitle(`  ${"a".repeat(81)}  `).ok).toBe(false);
  });

  it("counts an emoji as one character", () => {
    expect(validateTitle("👨‍👩‍👧".repeat(80)).ok).toBe(true);
    expect(validateTitle("👨‍👩‍👧".repeat(81)).ok).toBe(false);
  });
});
