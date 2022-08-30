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
    ...tailwindColors.zinc
  },
};
module.exports = { colors };
