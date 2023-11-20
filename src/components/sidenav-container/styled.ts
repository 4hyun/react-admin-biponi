import { Container, styled } from "@mui/material";
import { layoutConstant } from "utils/constants";

export const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  position: "relative",
  ".sidenav": {
    top: 0,
    bottom: 0,
    position: "relative",
    width: layoutConstant.sideBarNavWidth,
    minWidth: layoutConstant.sideBarNavWidth,
    height: `calc(100vh - ${layoutConstant.headerHeight}px)`,
    "& .MuiPaper-root": { borderRadius: 5 },
  },
  ".fixed": {
    position: "fixed",
    scrollBehavior: "unset",
    top: layoutConstant.headerHeight,
  },

  ".pageContent": {
    left: "unset",
    position: "relative",
    // marginLeft: "1.75rem",
    marginLeft: "2rem",
    width: `calc(100% - 2rem - ${layoutConstant.sideBarNavWidth}px)`,
  },

  ".pageContentShifted": {
    left: layoutConstant.sideBarNavWidth,
  },

  ".section1": {
    marginBottom: "3rem",
    marginTop: "1.75rem",
  },
  "@keyframes slideDown": {
    "0%": { opacity: 0, transform: "translateY(0)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  [theme.breakpoints.down("md")]: {
    ".sidenav": { display: "none" },
    ".pageContent": {
      left: "0px !important",
      width: "100% !important",
      marginLeft: "auto !important",
      marginRight: "auto !important",
    },
  },
}));
