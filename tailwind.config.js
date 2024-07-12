/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      convenia: {
        default: '#4C5371',
        500: '#4C5371',
      },
    },
    extend: {},
  },
  plugins: [],
}

