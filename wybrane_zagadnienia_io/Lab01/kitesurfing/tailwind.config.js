/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          DEFAULT: '#00A8A8',
          strong: '#007575',
          light: '#E6F7F7',
          50: '#F0FAFA',
          100: '#E0F5F5',
          500: '#00A8A8',
          700: '#007575',
        },
        navy: {
          DEFAULT: '#123B5D',
          dark: '#0B243B',
          light: '#1B4F7A',
          900: '#0B243B',
          800: '#123B5D',
          700: '#1D4D77',
        },
        coral: {
          DEFAULT: '#FF735C',
          strong: '#B93827',
          light: '#FFF0ED',
          50: '#FFF5F3',
          100: '#FFE6E1',
          500: '#FF735C',
          700: '#B93827',
        },
        sand: {
          DEFAULT: '#FAF7F0',
          50: '#FCFBF8',
          100: '#FAF7F0',
          200: '#F0EBE1',
          300: '#E5DEC8',
        },
        surface: '#FFFFFF',
        success: {
          DEFAULT: '#38A169',
          text: '#246B45',
          light: '#EBF8EE',
        },
        warningText: '#805200',
        muted: '#526777',
        border: {
          DEFAULT: '#DCE5E2',
          strong: '#71838A',
        },
        controlBorder: '#71838A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(18, 59, 93, 0.06)',
        panel: '0 16px 48px rgba(18, 59, 93, 0.16)',
        glow: '0 0 25px rgba(0, 168, 168, 0.25)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
