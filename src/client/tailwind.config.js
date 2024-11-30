/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/preline/dist/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          mainbg: '#090510',
          background: '#1B1624',
          main: '#9273F7',
          accent: '#FF0080',
          text: '#f1f1f1',
          hover: '#3D3067',
          border: '#FF0080',
        },
        light: {
          mainbg: '#FFFFFF',
          background: '#FEFDFF',
          accent: '#DD0001',
          text: '#000000',
          hover: '#ce5757',
          border: '#D1D5DB',
        },
      }
    },
  },
  plugins: [require('daisyui'), require('preline/plugin'), require('@tailwindcss/forms'),],
};
