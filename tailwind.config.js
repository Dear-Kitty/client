/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      bold: ['Paperlogy-7Bold'],
      semibold: ['Paperlogy-6Semibold'],
      medium: ['Paperlogy-5Medium'],
    },
    extend: {
      colors: {
        background: {
          overlay: 'rgba(0, 0, 0, 0.3)',
        },
        button: {
          primary: '#000000',
          secondary: '#808080',
          danger: '#C22D40',
        },
        text: {
          primary: '#000000',
          secondary: '#2D3748',
          muted: '#A0AEC0',
        },
        border: {
          light: '#D9D9D9',
          dark: '#2D3748',
        },
        login: {
          border: '#A9A9A9',
          text: '#888888',
        },
      },
    },
  },
  plugins: ['tailwind-scrollbar-hide'],
};
