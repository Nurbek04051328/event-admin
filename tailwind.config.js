/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#9E55EC',
        second: '#867B9A',
        third: '#4C435C',
        disabled: '#D9C0F3',
        event: {
          100: '#C3B5DD',
          200: '#A497BC',
          300: '#867B9A',
          500: '#645A77',
          700: '#4C435C',
          800: '#322B3F',
          'white-2': '#EEE6FE',
          'white-1': '#E1D5F6',
          'white-3': '#F5F0FF'
        }
      },
      screens: {
        xs: { max: '320px' }, // 320px yoki undan kichik
        xm: { max: '500px' }, // 375px – 500px oralig'i
        sm: { max: '640px' }, // 500px – 640px oralig'i
        md: { max: '768px' }, // 640px – 768px oralig'i
        lg: { max: '1024px' }, // 768px – 1024px oralig'i
        xl: { max: '1280px' }, // 1024px – 1280px oralig'i
        '2xl': { max: '1440px' } // 1280px – 1440px oralig'i
      }
    }
  },
  plugins: ['@tailwindcss/forms']
}
