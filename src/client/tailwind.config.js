/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    'node_modules/preline/dist/*.js',
  ],
  darkMode: 'class',
  corePlugins: {
    placeholderColor: true
  },
  theme: {
    extend: {
      colors: {
        dark: {
          mainbg: '#090510',
          'background-deepest': '#110A1F',
          background: '#160C26',
          'background-medium': '#171226',
          'background-light': '#1E1136',
          'background-lightest': '#251542',
          main: '#9273F7',
          "text-inactive": '#48397A',
          accent: '#FF0080',
          text: '#DDC9FF',
          title: '#785DA8',
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
