/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in the 'app' directory
        './pages/**/*.{js,ts,jsx,tsx,mdx}', // Good to include for compatibility, though less used with App Router
        './components/**/*.{js,ts,jsx,tsx,mdx}', // If you have a 'components' directory at the root
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
