/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Inter"', '"Manrope"', 'sans-serif'],
      },
      colors: {
        bg: "var(--bg)",
        "bg-soft": "var(--bg-soft)",
        surface: "var(--surface)",
        text: "var(--text)",
        muted: "var(--muted)",
        red: "var(--red)",
        "red-bright": "var(--red-bright)",
        "red-deep": "var(--red-deep)",
        orange: "var(--orange)",
        accent: "var(--accent)",
        copper: "var(--copper)",
      },
      boxShadow: {
        glow: "0 0 34px rgba(255,30,30,0.45)",
        "glow-lg": "0 0 60px rgba(255,30,30,0.5)",
        soft: "0 20px 60px rgba(0,0,0,0.55)",
      },
    },
  },
  plugins: [],
};

