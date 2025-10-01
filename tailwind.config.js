// const { join } = require("path");
// const webUiTemplate = require("some-template-config");
// const localContent = join(__dirname, './src/**/*.{js,ts,jsx,tsx}');
// const content = [...(webUiTemplate.content ?? []), localContent];

/** @type {import('tailwindcss').Config} */
module.exports = {
  //content: [
    // "./app/**/*.{js,ts,jsx,tsx}",  // Next.js App Router
    // "./pages/**/*.{js,ts,jsx,tsx}", // Optional if using Pages Router
    // "./components/**/*.{js,ts,jsx,tsx}"

    // "./src/app/**/*.{js,ts,jsx,tsx}",
    // "./src/components/**/*.{js,ts,jsx,tsx}",
  //],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxl: ['1.5rem', '1.95rem'],
        xl: ['1.375rem', '1.25rem'],
        lg: ['1.125rem', '1.25rem'],
        base: ['1rem', '1.25rem'],
        sm: ['0.875rem', '1rem'],
        xxs: ['0.6875rem', '1rem'],
      },
      colors: {
        // Button Backgrounds
        // "button-primary": "#0062ff",
        // "button-secondary": "#36ff7d",

        // Button Text
        // "button-text-primary": "#ffffff",
        // "button-text-secondary": "#f9fafb",
      },
      boxShadow: {
        'all-around': '0 4px 12px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}
