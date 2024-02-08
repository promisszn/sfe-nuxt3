/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Hanken Grotesk", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        "robin-bg": "#F3F7FF",
        "subtle-blue": "#9999BC",
        "robin-orange": "#EA8D51",
        "dark-02": "#51545C",
        "dark-03": "#8D9091",
        "robin-blue": "#4568D1",
        "robin-blue-light": "#566BA0",
        "robin-green": "#15AE73",
        "tone-blue": "#F5F7FC",
      },
    },
  },
  plugins: [],
};
