/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          "artist-gradient":
            "linear-gradient(358.14deg, rgba(30,21,19,0.04) 27%, rgba(184,113,101,0.22) 92.15%)",
        },
      },
      keyframes: {
        sound: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.2)' },
        },
      },
      animation: {
        sound: 'sound 1.2s infinite ease-in-out',
      },
    },
    plugins: [],
  }
  