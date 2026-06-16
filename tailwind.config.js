/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tonos tierra
        earth: {
          50:  '#fdf8f3',
          100: '#f5e9d8',
          200: '#e8d0b0',
          300: '#d4ae82',
          400: '#c2905a',
          500: '#a87340',
          600: '#8a5c30',
          700: '#6d4525',
          800: '#52311c',
          900: '#3a2213',
        },
        sand: {
          50:  '#faf7f2',
          100: '#f0e9db',
          200: '#dfd0b8',
          300: '#c9b08e',
          400: '#b59268',
          500: '#9e784d',
          600: '#84613d',
          700: '#694d30',
          800: '#4e3924',
          900: '#362718',
        },
        terracotta: {
          50:  '#fdf4f0',
          100: '#fae3d8',
          200: '#f5c4aa',
          300: '#ed9d75',
          400: '#e47548',
          500: '#d95a2a',
          600: '#b8431d',
          700: '#923318',
          800: '#6e2715',
          900: '#4e1c10',
        },
        // Colores fuego
        fire: {
          yellow: '#FFD700',
          amber:  '#FFA500',
          orange: '#FF6B00',
          red:    '#E63000',
          deep:   '#C01800',
        },
        // Neutral oscuro para fondos
        dark: {
          900: '#0f0d0b',
          800: '#1a1612',
          700: '#252019',
          600: '#332b22',
          500: '#44382d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'fire-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFA500 30%, #FF6B00 65%, #E63000 100%)',
        'earth-gradient': 'linear-gradient(135deg, #f5e9d8 0%, #d4ae82 50%, #8a5c30 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0f0d0b 0%, #1a1612 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-fire': 'pulseFire 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseFire: {
          '0%, 100%': { textShadow: '0 0 8px #FF6B00, 0 0 16px #FFA500' },
          '50%': { textShadow: '0 0 16px #FF6B00, 0 0 32px #FFA500, 0 0 48px #FFD700' },
        },
      },
      boxShadow: {
        'fire': '0 0 20px rgba(255, 107, 0, 0.4), 0 0 40px rgba(255, 165, 0, 0.2)',
        'fire-sm': '0 0 10px rgba(255, 107, 0, 0.3)',
        'earth': '0 4px 24px rgba(138, 92, 48, 0.25)',
        'card': '0 2px 16px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
