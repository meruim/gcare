/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: "rgb(39 40 122 / <alpha-value>)",
      secondary: "rgb(244 192 8 / <alpha-value>)",
    },
    animation: {
      "spin-slow": "spin 20s linear infinite",
    },
  },
};
export const plugins = [];
