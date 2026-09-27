/**
 * The entire palette. Three values, nothing else.
 * Every other tone in the UI is an alpha derivation of `ink`.
 */
export const color = {
  ink: "#111111",
  gray: "#888888",
  paper: "#FFFFFF",
} as const;

export const font = {
  display: "var(--font-source-serif)",
  body: "var(--font-inter)",
} as const;

export const layout = {
  /** Content gutter, grows to a 1280px cap on large screens. */
  max: "1280px",
  pad: "20px",
  padLg: "40px",
} as const;

export const space = {
  xs: "8px",
  sm: "16px",
  md: "28px",
  lg: "56px",
  xl: "96px",
  section: "clamp(56px, 8vw, 112px)",
} as const;
