module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f8faf9',
          DEFAULT: '#f1f6f5',
          dark: '#f6fafb',
        },
        brand: {
          light: '#d1dbd5',
          DEFAULT: '#bccac1',
          dark: '#708f7c',
        },
        notify: {
          DEFAULT: '#f04c0f',
        },
      },
      cursor: {
        grabbing: 'grabbing ',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
