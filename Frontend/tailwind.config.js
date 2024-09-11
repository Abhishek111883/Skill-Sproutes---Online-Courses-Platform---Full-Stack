/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#b68bdcb1",
        secondary: "#059212",
        dark: "#151515",
        darktext: "#FEFAE0",
        light: "#f7f7f7",
        lightgray: "#f7f7f7",
        darkgray: "#151515",
        black: "#000000",
        white: "#ffffff",
        red: "#ff0000",
        green: "#00ff00",
        blue: "#0000ff",
        darkmodegrey: "#1F2937",
      },
    },
  },
  plugins: [],
};
