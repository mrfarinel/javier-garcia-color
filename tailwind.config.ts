import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0D",
        line: "#252525",
        main: "#F5F5F5",
        body: "#B3B3B3",
        secondary: "#B3B3B3",
        minimal: "#7A7A7A",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
