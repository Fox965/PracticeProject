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
        'rainbow': 'linear-gradient(to right, #FF0000, #FF6B00, #FFD600, #52FF00, #00FF59, #0029FF, #EB05FF)',
        'stroke': '#E4E4E4',
        'main-yellow': '#F9B300',
        'main-yellow-hover': '#FA9E22',
        'black-two': '#222222',
        'grayText': '#747474',
        'button-confirm': '#333332',
        'gray-back': '#FCFCFC',
        'gray-stroke-one': '#F0F0F0',
        'gray-stroke-two': '#F6F6F6',
        'counter': '#F6F6F6',
        'gray-stroke-counter': '#D6D6D6',
        'back-text': '#C9C9C9',
        'admin-aside': '#F1F1F1',
        'button-admin': '#222299',
        'ref-admin': '#0832DE',
        'admin-text': '#343434',
      },
      fontFamily: {
        'main': 'Montserrat',
        'inter': 'Inter',
        'roboto': 'Roboto',
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