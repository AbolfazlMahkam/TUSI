/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", // اگه فایل‌هات تو src هست
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"), // برای shadcn
  ],
};
