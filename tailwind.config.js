const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      DEFAULT: '.25rem',
      'lg': '.5rem',
      'full': '9999px',
    },
    colors: {
      gray: { // warm grey
        50: '#FBFBF9',
        100: '#F5F5F2',
        200: '#EBEAE4',
        300: '#DBDBD3',
        400: '#B0AFA5',
        500: '#807F73',
        600: '#636250',
        700: '#4B4931',
        800: '#2D2B16',
        900: '#1C1B0B',
      },
      green: colors.emerald,
      blue: colors.lightBlue,
      red: colors.rose,
      pink: colors.fuchsia,
      white: colors.white,
    },
    fontFamily: {
      sans: ['PT Sans', 'sans-serif'],
      serif: ['Lora', 'Alegraya', 'PT Serif', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  variants: {
    extend: {
      borderColor: ['focus-visible'],
      opacity: ['disabled'],
    }
  }
}
