import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        wiki: {
          bg: "#ffffff",
          bgDark: "#101010",
          border: "#a2a9b1",
          borderDark: "#2c2c2c",
          link: "#0645ad",
          linkDark: "#6b96e5",
          text: "#202122",
          textDark: "#e5e5e5",
          panel: "#f8f9fa",
          panelDark: "#1a1a1a",
          header: "#eaecf0",
          headerDark: "#252525",
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Linux Libertine"', 'Georgia', 'Times', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
