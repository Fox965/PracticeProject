/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './views/**/*.hbs',
      './public/scripts/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': 'Montserrat',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateY(10px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sexual: {
          '0%, 100%': { transform: 'translateX(100px)' },
          '50%': { transform: 'translateX(-100px)' },
        }
      },
      animation:{
        'upper-slow': "wiggle 5s ease-in-out infinite",
        'upper-middle': "wiggle 4s ease-in-out infinite",
        'upper-fast': "wiggle 3s ease-in-out infinite",
        'sex': "sexual 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}