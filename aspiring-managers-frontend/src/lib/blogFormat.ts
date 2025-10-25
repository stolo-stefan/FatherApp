export type MediaKind = 0 | 1 | "Image" | "Video";

export const isVideo = (k: MediaKind) => k === 1 || k === "Video";

/** Normalize backend-stored plain text that used "/n" and "/t". */
export function normalizeContent(raw: string) {
  return raw
    .replaceAll("\r\n", "\n")
    .replaceAll("/n", "\n")
    .replaceAll("/t", "    ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
