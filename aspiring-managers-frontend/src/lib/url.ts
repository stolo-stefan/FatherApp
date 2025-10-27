export const apiBase =
    import.meta.env.PROD
        ? (import.meta.env.VITE_API_ORIGIN as string)          // e.g. https://api.aspiringmanagers.ro
        : (import.meta.env.VITE_API_URL_TEST as string);    // e.g. http://localhost:5167

export const API_ORIGIN = apiBase.replace(/\/api\/?$/, "");

// Resolve media URLs
export function mediaUrl(url: string) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_ORIGIN}${url}`;
}

export function hasSrc(u?: string | null) {
  return !!u && u.trim().length > 0;
}

export function isImageKind(k: 0 | 1 | "Image" | "Video") {
  return k === 0 || k === "Image";
}