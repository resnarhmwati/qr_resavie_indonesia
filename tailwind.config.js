import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Darker, rich coffee/chocolate brown to replace default amber
        amber: {
          50: '#f8f4f1',
          100: '#efe6df',
          200: '#ddc7bc',
          300: '#c2a191',
          400: '#9f7663',
          500: '#7a5647',
          600: '#624336',
          700: '#4e3328',
          800: '#3e281f',
          900: '#321f18',
          950: '#1e100a',
        },
        // Clean neutral gray to replace muddy stone
        stone: colors.zinc,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      aspectRatio: {
        'phone': '9/19',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}