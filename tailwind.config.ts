import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        stone: '#1a0f08',
        gold: '#c8a96e',
        parchment: '#f4e4c1',
        blood: '#8b1a1a',
        forest: '#1a3a1a',
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        body: ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
