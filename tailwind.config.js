/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        slideUp: {
          '0%': { transform: 'translate(0, 100%)', filter: 'opacity(.10)' },
          '100%': { transform: 'translate(0, 50%)', filter: 'opacity(1)' },
        },
        fadeOut: {
          '0%': { filter: 'opacity(1)' },
          '100%': { filter: 'opacity(.10)' },
        },
        fadeIn: {
          '0%': { filter: 'opacity(.10)' },
          '100%': { filter: 'opacity(1)' },
        } 
      },
      animation: {
        wiggle: 'wiggle 0.1s ease-in-out 1',
        slideUp: 'slideUp 0.5s ease-in 1',
        fadeOut: 'fadeOut  0.5s ease-out 1',
        fadeIn: 'fadeIn  0.5s ease-in 1',
      }
    },
  },
  plugins: [],
}
