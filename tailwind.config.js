/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B47E0",
        secondary: "#7C6FE8",
        accent: "#FF6B6B",
        surface: "#FFFFFF",
        background: "#F7F8FA",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6"
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-quick': 'pulse 150ms ease-out',
        'lift': 'lift 200ms ease-out',
        'drop': 'drop 200ms ease-out'
      },
      keyframes: {
        lift: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-4px)' }
        },
        drop: {
          '0%': { transform: 'translateY(-4px)' },
          '100%': { transform: 'translateY(0px)' }
        }
      }
    },
  },
  plugins: [],
}