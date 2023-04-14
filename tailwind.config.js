/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: { max: "450px" },
        tablet: { max: "640px" },
        laptop: { min: "641px", max: "1024px" },
        desktop: { min: "1015px" },
      },
      colors: {
        primary: "#D92228",
        text: "#656565",
        title: "#333333",
        "text-dark": "#656565",
        "title-dark": "#dddddd",
        "bg-light": "#fff",
        "bg-dark": "#1F2937",
        error: "",
        "error-dark": "",
      },
    },
  },
  plugins: [],
};
