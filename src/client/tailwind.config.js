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
      // fontFamily: {
      //   sans: ['Inter', 'Arial'],
      // },
      colors: {
        dark: {
          mainbg: '#06030A',
          'background-deepest': '#0F091C',
          // background: '#140C26',
          background: '#180E2E',
          'background-medium': '#171226',
          'background-light': '#1E1136',
          'background-lightest': '#251542',
          main: '#9273F7',
          "text-inactive": '#54438F',
          accent: '#FF0080',
          text: '#FFFFFF',
          textPurple: '#DDC9FF',
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
