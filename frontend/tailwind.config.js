/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],

    theme: {
        extend: {

            colors: {
                primary: "#4F6DB8",
                secondary: "#F5F7FB",
                productive: "#16A34A",
                unproductive: "#DC2626",
                neutral: "#CA8A04",
            },

            fontFamily: {
                sans: ["Inter", "sans-serif"],
            },

            boxShadow: {
                card: "0 2px 10px rgba(0,0,0,0.05)",
            },

            borderRadius: {
                xl: "16px",
            },

        },
    },
    
    plugins: [],
};
