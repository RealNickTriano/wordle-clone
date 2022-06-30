/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
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
        slideDown: {
          '0%': { transform: 'translate(0)', filter: 'opacity(1)' },
          '100%': { transform: 'translate(0, 50%)', filter: 'opacity(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translate(-100%, 0)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        slideOutLeft: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-100%, 0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translate(50%, 0)', filter: 'opacity(0)' },
          '100%': { transform: 'translate(0, 0)', filter: 'opacity(1)' },
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
          '0%': { transform: 'scaleY(1)', backgroundColor: 'transparent', borderColor: '#6b7280' },
          '50%': { transform: 'scaleY(0)', backgroundColor: 'transparent', borderColor: '#6b7280' },
          '51%': { transform: 'scaleY(0)', backgroundColor: '#65a30d', borderColor: '#65a30d' },
          '100%': { transform: 'scaleY(1)', backgroundColor: '#65a30d', borderColor: '#65a30d' },
        },
        flipYellow: {
          '0%': { transform: 'scaleY(1)', backgroundColor: 'transparent', borderColor: '#6b7280' },
          '50%': { transform: 'scaleY(0)', backgroundColor: 'transparent', borderColor: '#6b7280' },
          '51%': { transform: 'scaleY(0)', backgroundColor: '#fbbf24', borderColor: '#fbbf24' },
          '100%': { transform: 'scaleY(1)', backgroundColor: '#fbbf24', borderColor: '#fbbf24' },
        },
        flipGray: {
          '0%': { transform: 'scaleY(1)', backgroundColor: 'transparent', borderColor: '#6b7280' },
          '50%': { transform: 'scaleY(0)', backgroundColor: 'transparent', borderColor: '#6b7280' },
          '51%': { transform: 'scaleY(0)', backgroundColor: '#cbd5e1', borderColor: '#cbd5e1' },
          '100%': { transform: 'scaleY(1)', backgroundColor: '#cbd5e1', borderColor: '#cbd5e1' },
        }  
      },
      animation: {
        wiggle: 'wiggle 0.1s ease-in-out 1',
        slideUp: 'slideUp 0.5s ease-in 1',  
        slideDown: 'slideDown 0.5s ease-out 1',
        slideInRight: 'slideInRight 0.3s linear 1', 
        slideOutLeft: 'slideOutLeft 0.3s linear 1', 
        slideInLeft: 'slideInLeft 0.5s ease-in 1',
        fadeOut: 'fadeOut  0.5s ease-out 1',
        fadeIn: 'fadeIn  0.5s ease-in 1',
        flipGreen: 'flipGreen .5s linear 1',
        flipYellow: 'flipYellow .5s linear 1',
        flipGray: 'flipGray .5s linear 1',
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('colorblind', '&:colorblind')
    })
  ],
}
