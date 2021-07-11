module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display SC', 'sans-serif']
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        gray: {
          darkest: '#1A1317',
          dark: '#2F282C',
          DEFAULT: '#5E5158',
          light: '#6d5f66',
          lightest: '#DDDDDD',
          border: 'rgba(222,222,222,0.25)',
        },
        iris: {
          dark: '#5D5FEF',
          DEFAULT: '#7879F1',
          light: '#A5A6F6',
        },
        violet: {
          DEFAULT: '#9568a6',
          light: '#b47dc7',
          lightest: '#e7a0ff',
        },
        fucsia: {
          DEFAULT: '#EF5DA8'
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
