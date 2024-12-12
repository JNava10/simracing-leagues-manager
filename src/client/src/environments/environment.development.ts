import colors from 'tailwindcss/colors'; // Usar si se quieren setear colores de tailwind

/**
 * Variables del entorno de desarrollo.
 */
export const devEnv = {
  apiEndpoint: "http://localhost:3000",
  socketEndpoint: "http://localhost:3000",

  rootRoute: "/lm",

  defaultColors: {
    dark: {
      mainBackground: "#090510",
      background: "#261E43",
      main: "#9273F7",
      accent: "#FF0080",
      text: "#374151",
      hover: "#FEFDFF",
      border: "#FF0080",
    },

    light: {
      mainBackground: "",
      background: "#FEFDFF",
      accent: "#DD0001",
      text: "#000000",
      hover: "#ce5757",
      border: "#D1D5DB",
    },
  },
};
