
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Adjust based on where your components live
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fadeInOut 4s ease-in-out forwards',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '10%, 90%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-10px)' },
        },
      },
      colors: {
        brandRed: '#ff0707',
        darkRed: '#FC0919',
      },
    },
  },
  plugins: [],
};