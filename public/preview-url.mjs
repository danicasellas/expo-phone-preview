const DEFAULT_PREVIEW_URL = "http://localhost:8081/";

export function extractPreviewUrl(input) {
  const rawValue = String(input || "").trim();

  if (!rawValue) {
    return DEFAULT_PREVIEW_URL;
  }

  const match = rawValue.match(/https?:\/\/[^\s]+|localhost:\d+[^\s]*/i);
  const candidate = match ? match[0] : rawValue;
  const withProtocol = /^https?:\/\//i.test(candidate)
    ? candidate
    : `http://${candidate}`;

  try {
    return new URL(withProtocol).toString();
  } catch {
    return DEFAULT_PREVIEW_URL;
  }
}
