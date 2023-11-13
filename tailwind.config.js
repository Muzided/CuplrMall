/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor:{
        "bg-color":{
          "Primary":"#1B1B1B",
          "Secondary":"26262c"
        },
        
      },
      textColor:{
       
          "hover-yellow":"#6b5fc9"
      },
      backgroundImage: {
       
        site: 'url("/src/assets/images/site-bg.svg")',
        stripes: 'url("/src/assets/images/stripes.png")'
      },
      fontFamily:{
        'poppins':['Poppins','sans-serif']
      }
    },
  },
  plugins: [],
}