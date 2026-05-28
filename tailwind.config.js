/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        neon: {
          blue: '#4fc3f7',
          cyan: '#00e5ff',
          purple: '#b39ddb',
        },
      },
    },
  },
  plugins: [],
}
