import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      container: {
        screens: {
          sm: "640px",
          md: "768px",
          lg: "768px",
          xl: "768px",
          "2xl": "768px",
        },
      },
      colors: {
        customGray: {
          "200": "#f2f2f2",
          "400": "#CCCCCC",
          "600": "#A5A5A5",
          "800": "#7F7F7F",
          "900": "#595959",
        },
      },
    },
  },
  plugins: [],
};
export default config;
