/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // World 1: Sheryians Editorial Public & Auth Palette
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

        // World 2: Antigravity Deep Slate Studio Workspace Palette
        agCanvas: '#0E1015',
        agSidebar: '#12141A',
        agPanel: '#161820',
        agPanelElevated: '#1A1D26',
        agInput: '#1A1D26',
        agBorder: '#252833',
        agBorderHover: '#363A48',
        agTextPrimary: '#FFFFFF',
        agTextSecondary: '#9DA1AB',
        agTextMuted: '#646875',
        agBlue: '#1A73E8',
        agBlueHover: '#1557B0',

        // Fiduciary Status Semantics
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
