import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ffffff',
        primary: '#ff1a1a',
        'primary-dark': '#cc1515',
        secondary: '#a855f7',
        accent: '#06b6d4',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-primary': 'radial-gradient(circle, rgba(255, 26, 26, 0.15) 0%, transparent 70%)',
        'glow-secondary': 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(255, 26, 26, 0.2)',
        'glow-md': '0 0 40px rgba(255, 26, 26, 0.3)',
        'glow-lg': '0 0 60px rgba(168, 85, 247, 0.3)',
        'glow-xl': '0 0 80px rgba(255, 26, 26, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', 'box-shadow': '0 0 20px rgba(255, 26, 26, 0.2)' },
          '50%': { opacity: '1', 'box-shadow': '0 0 40px rgba(255, 26, 26, 0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
export default config
