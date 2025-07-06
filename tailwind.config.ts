import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".pt-safe-top": {
          paddingTop: "env(safe-area-inset-top)",
        },
        ".pb-safe-bottom": {
          paddingBottom: "env(safe-area-inset-bottom)",
        },
      });
    }),
  ],
};

export default config;
