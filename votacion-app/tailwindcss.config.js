/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#1E40AF',
                secondary: '#10B981',
            },
        },
    },
    plugins: [],
}