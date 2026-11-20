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

        // World 2: Exact Pixel-Sampled Google Antigravity Palette
        agCanvas: '#0B0C0E',        // Center stream pure charcoal-black canvas
        agSidebar: '#101114',       // Left & Right 240px/290px panes
        agPanel: '#141619',         // Code / Data container block
        agPanelElevated: '#1C1E22', // Soft gray pill / active sidebar row
        agCodePill: '#1B1E24',      // Inline monospace pill background
        agInput: '#141619',         // Floating prompt dock & inputs
        agBorder: '#1E2024',        // Ultra-quiet 1px pane & divider hairline
        agBorderSubtle: '#22252A',  // Code block border
        agBorderHover: '#2E323B',   // Hover border state
        agTextPrimary: '#ECEEEF',   // Crisp off-white primary text
        agTextSecondary: '#9BA1A6', // Calm ash-gray body & sidebar items
        agTextMuted: '#636870',     // Timestamps & inactive labels
        agBlue: '#1A73E8',          // The ONE primary action pill blue
        agBlueHover: '#1864CF',

        // Quiet Fiduciary Status Tokens
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
