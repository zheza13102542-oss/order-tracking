import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EAEDEF",
        card: "#FFFFFF",
        ink: "#131A21",
        muted: "#5C6B78",
        line: "#D6DCE1",
        navy: {
          DEFAULT: "#123A5A",
          deep: "#0C2840",
          soft: "#E7EDF3",
        },
        status: {
          queuedFg: "#3F5361",
          queuedBg: "#E6EBEF",
          queuedDot: "#6B8296",
          progressFg: "#0B5CAB",
          progressBg: "#E1EEFB",
          progressDot: "#1478D4",
          doneFg: "#106B4E",
          doneBg: "#E1F1EA",
          doneDot: "#17976D",
          payFg: "#9A4A06",
          payBg: "#FCEEDC",
          payDot: "#D4820F",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans Thai'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      boxShadow: {
        raise: "0 1px 2px rgba(19,26,33,.06), 0 8px 24px -12px rgba(19,26,33,.18)",
      },
      borderRadius: {
        slab: "14px",
      },
    },
  },
  plugins: [],
};

export default config;
