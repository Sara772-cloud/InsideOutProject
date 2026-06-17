/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
    "./src/**/*.{html,ts}",
    ],
    theme: {
    extend: {
        colors: {
        primary: "#7c3bed",
        "background-light": "#F8F4EE",
        "background-dark": "#171121",
        "surface-light": "#ffffff",
        "surface-dark": "#231a31",
        lavender: {
            50: "#f5f3ff",
            100: "#ede9fe",
            200: "#ddd6fe",
            600: "#7c3bed",
            700: "#6d28d9"
        }
        },
        fontFamily: {
        display: ["Lexend", "sans-serif"],
        sans: ["Lexend", "sans-serif"]
        },
        borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
        },
    },
    },
    plugins: [],
}