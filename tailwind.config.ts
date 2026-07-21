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
        // Cape Verde flag blue — primary
        brand: {
          50: '#eaf1fb',
          100: '#cfe0f7',
          200: '#a3c2ee',
          300: '#6f9be0',
          400: '#3d6fcb',
          500: '#1a4fae',
          DEFAULT: '#003893',
          600: '#003893',
          700: '#002f7a',
          800: '#012a63',
          900: '#04204a',
          dark: '#002f7a',
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
        card: '0 1px 2px rgba(0,45,122,0.05), 0 8px 24px -12px rgba(0,45,122,0.22)',
      },
      backgroundImage: {
        'hero-ocean':
          'radial-gradient(1200px 480px at 85% -10%, rgba(242,97,42,0.30), transparent 60%), linear-gradient(135deg, #012a63 0%, #003893 48%, #1a4fae 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
