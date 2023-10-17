/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xxs': '480px',
        'xs': "576px",
        'idk': '768px',
        'sm': '960px',
        'kdi': '1200px',
        'md': '1440px',
        'lg': '1680px',
        'xl': '1920px',
        '2xl': '2240px',
        '3xl': '2560px'
      },
      colors: {
        'app-blue': '#3F60B4',
        'gradient-su-blue': '#5682F1',
        'gradient-su-teal': '#27CCF0',
        'admin-background': '#FFFFF7',
        'admin-nav-links': '#303030',
        'divsion-line': '#E0E0E0',
        'white': '#FFFFFF'
      },
      fontFamily: {
        'sans': [ 'Inter', 'ui-sans-serif', 'system-ui'],
        'bebas-neue': [ 'Bebas Neue', 'ui-sans-serif', 'system-ui'],
        'dancing-script': ['Dancing Script', 'ui-sans-serif', 'system-ui'],
        'bangers': ['Bangers', 'ui-sans-serif', 'system-ui'],
        'pixelify': ['Pixelify Sans', 'ui-sans-serif', 'system-ui'],
        'autour-one': ['Autour One', 'ui-sans-serif', 'system-ui'],
        'ibm-plex-mono': ['IBM Plex Mono', 'ui-sans-serif', 'system-ui'],
        'caveat': ['Caveat', 'ui-sans-serif', 'system-ui'],
        'indie-flower': ['Indie Flower', 'ui-sans-serif', 'system-ui'],
        'bodoni-moda': ['Bodoni Moda', 'ui-sans-serif', 'system-ui'],
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-3deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      }
    },
  },
  plugins: [],
}

