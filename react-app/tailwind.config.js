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
        'secondary': '#fdb72f',
        'grey-light': '#767676',
        'grey-medium': '#666',
        'grey-dark': '#333',
      },
      gridTemplateColumns: {
        'layout': 'repeat(auto-fill, minmax(20rem, 1fr))',
      }
    },
  },
  plugins: [],
}
