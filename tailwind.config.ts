import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: { tightish: '-0.015em' },
      colors: {
        // Atlantic ocean — primary
        brand: {
          50: '#eef8fb',
          100: '#d2ecf3',
          200: '#a6d7e7',
          300: '#6fbbd6',
          400: '#3d9abd',
          500: '#1d7d9f',
          DEFAULT: '#0e6a91',
          600: '#0e6a91',
          700: '#0f5675',
          800: '#134860',
          900: '#123c52',
          dark: '#0f5675',
        },
        // Sunset coral — accent
        coral: {
          50: '#fff4ee',
          100: '#ffe3d5',
          200: '#ffc2a6',
          300: '#ff9b6f',
          400: '#fb7a46',
          500: '#f2612a',
          DEFAULT: '#f2612a',
          600: '#e14c17',
          700: '#bb3b14',
          800: '#953118',
          900: '#792c17',
        },
        // Warm sand — neutrals for surfaces
        sand: {
          50: '#faf8f3',
          100: '#f3ece0',
          200: '#e7dbc7',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,86,117,0.04), 0 8px 24px -12px rgba(15,86,117,0.18)',
      },
      backgroundImage: {
        'hero-ocean':
          'radial-gradient(1200px 480px at 85% -10%, rgba(242,97,42,0.28), transparent 60%), linear-gradient(135deg, #0f5675 0%, #0e6a91 45%, #1d7d9f 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
