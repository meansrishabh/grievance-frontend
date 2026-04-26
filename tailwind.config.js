/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#172033',
        muted: '#657188',
        surface: '#f5f7fb',
        line: '#d9e0ea',
        gov: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
          900: '#172554'
        },
        success: '#15803d',
        warning: '#b45309',
        danger: '#b91c1c'
      },
      boxShadow: {
        panel: '0 12px 30px rgba(23, 32, 51, 0.08)'
      }
    }
  },
  plugins: []
};
