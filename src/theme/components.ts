import { primary } from "./themeColors";
import { openSans } from "./typography";

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        scrollBehavior: "smooth",
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none",
      },
      a: {
        color: "inherit",
        textDecoration: "none",
      },
      button: {
        fontSize: 14,
        fontFamily: openSans.style.fontFamily,
      },
      ".MuiRating-sizeSmall": {
        fontSize: "20px",
      },
      "#nprogress .peg": { boxShadow: "none" },
      "#nprogress .bar": { zIndex: "9999 !important", backgroundColor: primary[500] },
    },
  },
  MuiPagination: {
    defaultProps: {
      variant: "outlined",
      color: "primary",
    },
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined",
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        zIndex: 0,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 600,
        textTransform: "capitalize",
        minWidth: 0,
        minHeight: 0,
      },
    },
    defaultProps: {
      color: "inherit",
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 8,
      },
    },
  },
};
