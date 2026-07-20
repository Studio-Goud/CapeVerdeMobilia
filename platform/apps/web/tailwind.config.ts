import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0e7490', // teal — sea/land
          dark: '#155e75',
        },
      },
    },
  },
  plugins: [],
};

export default config;
