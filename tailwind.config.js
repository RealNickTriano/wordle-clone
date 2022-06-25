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
          '0%': { transform: 'translate(0, 50%)', filter: 'opacity(.10)' },
          '100%': { transform: 'translate(0)', filter: 'opacity(1)' },
        },
        fadeOut: {
          '0%': { filter: 'opacity(1)' },
          '100%': { filter: 'opacity(.10)' },
        },
        fadeIn: {
          '0%': { filter: 'opacity(.10)' },
          '100%': { filter: 'opacity(1)' },
        },
        flipGreen: {
          '0%': { transform: 'scaleY(1)', backgroundColor: 'white', borderColor: '#6b7280' },
          '50%': { transform: 'scaleY(0)', backgroundColor: 'white', borderColor: '#6b7280' },
          '51%': { transform: 'scaleY(0)', backgroundColor: '#65a30d', borderColor: '#65a30d' },
          '100%': { transform: 'scaleY(1)', backgroundColor: '#65a30d', borderColor: '#65a30d' },
        },
        flipYellow: {
          '0%': { transform: 'scaleY(1)', backgroundColor: 'white', borderColor: '#6b7280' },
          '50%': { transform: 'scaleY(0)', backgroundColor: 'white', borderColor: '#6b7280' },
          '51%': { transform: 'scaleY(0)', backgroundColor: '#fbbf24', borderColor: '#fbbf24' },
          '100%': { transform: 'scaleY(1)', backgroundColor: '#fbbf24', borderColor: '#fbbf24' },
        },
        flipGray: {
          '0%': { transform: 'scaleY(1)', backgroundColor: 'white', borderColor: '#6b7280' },
          '50%': { transform: 'scaleY(0)', backgroundColor: 'white', borderColor: '#6b7280' },
          '51%': { transform: 'scaleY(0)', backgroundColor: '#cbd5e1', borderColor: '#cbd5e1' },
          '100%': { transform: 'scaleY(1)', backgroundColor: '#cbd5e1', borderColor: '#cbd5e1' },
        }  
      },
      animation: {
        wiggle: 'wiggle 0.1s ease-in-out 1',
        slideUp: 'slideUp 0.5s ease-in 1',
        fadeOut: 'fadeOut  0.5s ease-out 1',
        fadeIn: 'fadeIn  0.5s ease-in 1',
        flipGreen: 'flipGreen .5s linear 1',
        flipYellow: 'flipYellow .5s linear 1',
        flipGray: 'flipGray .5s linear 1',
      }
    },
  },
  plugins: [],
}
