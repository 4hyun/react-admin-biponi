import { Box, Drawer, styled } from "@mui/material";
import NavLink from "components/nav-link/NavLink";
import { layoutConstant } from "utils/constants";

// styled components
const Wrapper = styled(Box)(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 12,
  display: "none",
  position: "fixed",
  justifyContent: "space-around",
  height: layoutConstant.mobileNavHeight,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 1px 4px 3px rgba(0, 0, 0, 0.1)",
  "@media only screen and (max-width: 900px)": { display: "flex", width: "100vw" },
}));

const StyledNavLink = styled(NavLink)(() => ({
  flex: "1 1 0",
  display: "flex",
  fontSize: "13px",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  flex: "1 1 0",
  display: "flex",
  fontSize: "13px",
  cursor: "pointer",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  transition: "color 150ms ease-in-out",
  "&:hover": { color: `${theme.palette.primary.main} !important` },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 250,
  flexShrink: 0,
  "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box", boxShadow: theme.shadows[2] },
}));

export { Wrapper, StyledBox, StyledDrawer, StyledNavLink };
