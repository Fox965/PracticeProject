/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './views/**/*.hbs',
      './public/scripts/**/*.js',
  ],
  theme: {
    extend: {
      container: {
        screens: {
          mb: '375px',  //ширина под мобилки (прямо как в нашем дизайне)
          sm: '640px',  
          md: '768px',  
          lg: '1024px', 
          xl: '1280px', 
          '2xl': '1536px',
	        '3xl': '1660px',  //изменил под десктопы, чтобы хоть как-то под размеры макета попасть
        },
      },
      colors:{
        'stroke': '#E4E4E4',
        'main-yellow': '#F9B300',
        'main-yellow-hover': '#FA9E22',
        'black-two': '#222222',
        'grayText': '#747474',
        'button-confirm': '#333332',
      },
      fontFamily: {
        'main': 'Montserrat',
      },
      boxShadow: {
        'cards': '0px 0px 64px -35px rgba(0,0,0,0.79)',
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