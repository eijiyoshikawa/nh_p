// Shared helpers for OGP image generation via next/og (satori).
// satori accepts TTF and OTF (no WOFF/WOFF2, no variable-axis TTFs in practice).
// We fetch a static-weight Noto Sans JP Bold OTF at build time; the promise is
// memoized so the same build only downloads it once.

const NOTO_SANS_JP_BOLD_URL =
  "https://raw.githubusercontent.com/notofonts/noto-cjk/main/Sans/SubsetOTF/JP/NotoSansJP-Bold.otf";

let notoBoldPromise: Promise<ArrayBuffer> | null = null;

export function loadNotoSansJpBold(): Promise<ArrayBuffer> {
  if (!notoBoldPromise) {
    notoBoldPromise = (async () => {
      const res = await fetch(NOTO_SANS_JP_BOLD_URL);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch Noto Sans JP Bold: ${res.status} ${res.statusText}`
        );
      }
      return res.arrayBuffer();
    })();
  }
  return notoBoldPromise;
}

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export const ogTheme = {
  background: "#FFFBF5",
  accent: "#F97316",
  eyebrow: "#78716C",
  text: "#1C1917",
  secondary: "#57534E",
  border: "#FED7AA",
} as const;
