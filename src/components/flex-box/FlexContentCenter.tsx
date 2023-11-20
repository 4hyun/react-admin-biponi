import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const FlexContentCenter: FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" justifyContent="center" {...props}>
    {children}
  </Box>
);

export default FlexContentCenter;
