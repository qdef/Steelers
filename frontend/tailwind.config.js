// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFD700",
          secondary: "#000000",
          accent: "#1c1c1c",
          neutral: "#2a2a2a",
          "base-100": "#111111",
        },
      },
    ],
  },
};
