/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: "rgb(39 40 122 / <alpha-value>)",
      secondary: "rgb(244 192 8 / <alpha-value>)",
    },
    keyframes: {
      "fade-in-scale": {
        "0%": {
          opacity: "0",
          transform: "scale(0.8)",
        },
        "100%": {
          opacity: "1",
          transform: "scale(1)",
        },
      },
      "fade-in-up": {
        "0%": {
          opacity: "0",
          transform: "translateY(20px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
    animation: {
      "spin-slow": "spin 20s linear infinite",
      "fade-in-scale": "fade-in-scale 0.8s ease-out forwards",
      "fade-in-up": "fade-in-up 0.6s ease-out forwards",
    },
  },
};
export const plugins = [];
