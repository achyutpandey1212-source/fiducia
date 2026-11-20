/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        bento: '#080808',
        card: '#0C0C0C',
        elevated: '#121212',
        input: '#141414',
        cream: '#FFF3EC',
        creamCard: '#FFE4D3',
        inkOnCream: '#18181B',
        vermilion: {
          50: '#FFF3EC',
          100: '#FFE4D3',
          200: '#FFC4A6',
          300: '#FF9D6E',
          400: '#FF6832',
          500: '#E8602E',
          600: '#D73A0A',
          950: '#3F0C06',
        },
        bentoBorder: '#302C2A',
        standardBorder: '#262626',
        fiduciarySafe: '#10B981',
        fiduciaryWarning: '#F59E0B',
        fiduciaryDanger: '#EF4444',
      },
      fontFamily: {
        machina: ['"Neue Machina"', 'sans-serif'],
        manrope: ['"Manrope"', 'sans-serif'],
        caveat: ['"Caveat Brush"', 'cursive'],
      },
    },
  },
  plugins: [],
};
