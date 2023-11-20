import { styled, Box } from "@mui/material";
import { layoutConstant } from "utils/constants";

// styled component
export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  height: layoutConstant.headerHeight,
  background: theme.palette.background.paper,
  transition: "height 250ms ease-in-out",
  [theme.breakpoints.down("sm")]: { height: layoutConstant.mobileHeaderHeight },
}));
