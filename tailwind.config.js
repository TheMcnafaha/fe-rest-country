/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "hsl(0, 0%, 98%)",
        "dark-gray": "hsl(0, 0%, 52%)",
        "dark-blue": " hsl(209, 23%, 22%)",
        "very-dark-blue": " hsl(207, 26%, 17%)",
        "blue-darko": " hsl(200, 15%, 8%)",
      },
    },
  },
  plugins: [],
};
