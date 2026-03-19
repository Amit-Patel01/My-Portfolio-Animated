/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%':     { boxShadow: '0 0 50px rgba(99,102,241,0.65), 0 0 90px rgba(139,92,246,0.25)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        float:      'float 4s ease-in-out infinite',
        shimmer:    'shimmer 3s linear infinite',
        pulseGlow:  'pulseGlow 3s ease-in-out infinite',
        fadeUp:     'fadeUp 0.6s ease forwards',
        scaleIn:    'scaleIn 0.5s ease forwards',
      },
    },
  },
  plugins: [],
}
