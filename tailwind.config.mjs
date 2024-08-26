/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      xxs: '320px',
      xs: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        'brand-yellow': '#FEDD00',
        'brand-red': '#DA291C',
        'brand-blue': '#0019AD',
        red: { 400: '#E7584D', 500: '#E43F33', 600: '#DA291C' },
        'club-blue': {
          100: '#D1D6FA',
          200: '#9FAAF8',
          300: '#6A7CF7	',
          400: '#4154F6',
          500: '#1A6FFF',
          600: '#222FF8',
          800: '#101FC5',
          900: '#0019AD',
        },
        yellow: {
          300: '#FDFF86',
          400: '#FFFA41',
          500: '#FFE11D',
          600: '#FEDD00',
          700: '#E3C500',
        },
      },
    },
  },
  plugins: [],
};
