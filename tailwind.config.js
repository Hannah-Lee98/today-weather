/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      info: "#1fb6ff",
      error: "#C10D0DFF",
      warning: "#ff7849",
      success: "#13ce66",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
