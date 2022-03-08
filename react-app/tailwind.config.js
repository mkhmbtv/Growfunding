module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['Lato', 'Arial', 'sans-serif'],
      logo: ['Montserrat']
    },
    extend: {
      colors: {
        'primary': '#2f9e44',
        'secondary': '#20c997',
        'neutral-light': '#fbf8f6',
        'grey-light': '#767676',
        'grey-medium': '#666',
        'grey-dark': '#333',
        'black-rgba': 'rgba(0, 0, 0, 0.7)',
      },
      gridTemplateColumns: {
        'layout': 'repeat(auto-fill, minmax(20rem, 1fr))',
      }
    },
  },
  plugins: [],
}
