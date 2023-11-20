import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// ==============================================================
type StyledBoxProps = {
  fixed?: number;
  fixed_on?: number;
  component_height?: number;
};
// ==============================================================

export const StyledBox = styled(Box)<StyledBoxProps>((props) => {
  const { theme, component_height, fixed_on, fixed } = props;

  return {
    "& .hold": {
      zIndex: 2,
      boxShadow: "none",
      position: "relative",
    },

    "& .fixed": {
      left: 0,
      right: 0,
      zIndex: 1000,
      top: fixed_on,
      position: "fixed",
      boxShadow: theme.shadows[2],
      transition: "all 350ms ease-in-out",
    },

    "& + .section-after-sticky": {
      paddingTop: fixed ? component_height : 0,
    },
  };
});
