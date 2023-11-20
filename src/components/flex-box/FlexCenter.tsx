import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const FlexCenter: FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" justifyContent="center" alignItems="center" {...props}>
    {children}
  </Box>
);

export default FlexCenter;
