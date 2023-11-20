import { createTheme, responsiveFontSizes, Theme } from "@mui/material";
import merge from "merge";
import { components } from "./components";
import { paste, primary, themeColors } from "./themeColors";
import { typography } from "./typography";

const THEMES = {
  DEFAULT: "DEFAULT",
  VERSION_ONE: "VERSION_ONE",
  VERSION_TWO: "VERSION_TWO",
};

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const themesOptions = {
  [THEMES.DEFAULT]: {
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...primary, light: primary[100] },
      ...themeColors,
    },
    typography,
  },
  [THEMES.VERSION_ONE]: {
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...primary, light: primary[100] },
      ...themeColors,
    },
    typography,
  },
  [THEMES.VERSION_TWO]: {
    breakpoints,
    components: { ...components },
    palette: {
      primary: { ...paste, light: paste[100] },
      ...themeColors,
    },
    typography,
  },
};

export type MuiThemeProps = Theme;

export const bazarTheme = () => {
  var themeOptions = themesOptions[THEMES.VERSION_ONE];
  let theme = createTheme(merge({}, themeOptions));
  theme = responsiveFontSizes(theme);

  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";

  return theme;
};
