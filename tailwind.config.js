/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': { 'max': '320px' },        // 320px yoki undan kichik
        'xs-max': { 'max': '375px' },   // 320px – 375px oralig'i
        'xm': { 'max': '500px' },      // 375px – 425px oralig'i
        'xm-max': { 'max': '500px' },      // 375px – 425px oralig'i
        'sm': { 'max': '640px' },     // 425px – 640px oralig'i
        'md': { 'max': '768px' },    // 640px – 768px oralig'i
        'md-max': { 'max': '768px' },    // 640px – 768px oralig'i ikkita yozishga majbur boldim tailwind klaslarda miuammo boldi
        'lg': { 'max': '1024px' },   // 768px – 1024px oralig'i
        'xl': { 'max': '1280px' },   // 1024px – 1280px oralig'i
        '2xl': { 'max': '1440px' },  // 1280px – 1440px oralig'i
      }
    }
  },
  plugins: ['@tailwindcss/forms']
}
