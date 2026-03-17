/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff1a1a',
        'primary-dark': '#cc1515',
        secondary: '#a855f7',
        accent: '#22d3ee',
        background: '#0a0a0a',
        foreground: '#f8fafc',
        'dark-bg': '#0a0a0a',
        'dark-card': '#13131a',
        'dark-border': '#2a2a3a',
        'glass-sm': 'rgba(19, 19, 26, 0.5)',
        'glass-md': 'rgba(19, 19, 26, 0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'typing': 'typing 0.6s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
        'typing-dots': 'typing 0.6s ease-in-out infinite',
        'bounce-subtle': 'bounce 1s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float-slow': 'floatSlow 14s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '0%': { backgroundColor: 'rgba(255, 26, 26, 0.5)' },
          '100%': { backgroundColor: 'rgba(255, 26, 26, 0.8)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 26, 26, 0.7)' },
          '50%': { boxShadow: '0 0 0 10px rgba(255, 26, 26, 0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -18px, 0)' },
        },
      },
    },
  },
  plugins: [],
}
