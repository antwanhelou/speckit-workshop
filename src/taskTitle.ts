export const MAX_TITLE_LENGTH = 80;

export type TitleResult =
  | { ok: true; title: string }
  | { ok: false; message: string };

// Count what a user sees as one character (emoji and accents included).
export function countCharacters(text: string): number {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  let count = 0;
  for (const _ of segmenter.segment(text)) count += 1;
  return count;
}

export function validateTitle(raw: string): TitleResult {
  const title = raw.trim();
  if (title.length === 0) {
    return { ok: false, message: "Enter a task title before adding." };
  }
  if (countCharacters(title) > MAX_TITLE_LENGTH) {
    return {
      ok: false,
      message: `Task title must be ${MAX_TITLE_LENGTH} characters or fewer. Shorten it and try again.`,
    };
  }
  return { ok: true, title };
}
