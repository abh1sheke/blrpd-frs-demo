const tailwindColors = require("tailwindcss/colors");

// Remove deprecated colors in default tailwind palette to fix warning
delete tailwindColors["lightBlue"];
delete tailwindColors["warmGray"];
delete tailwindColors["trueGray"];
delete tailwindColors["coolGray"];
delete tailwindColors["blueGray"];

const colors = {
  ...tailwindColors,
  dark: {
    ...tailwindColors.zinc,
  },
  cgrey: {
    50: "#F5F7FA",
    100: "#E4E7EB",
    200: "#CBD2D9",
    300: "#9AA5B1",
    400: "#7B8794",
    500: "#616E7C",
    600: "#52606D",
    700: "#3E4C59",
    800: "#323F48",
    900: "#1F2933",
  },
};
module.exports = { colors };
