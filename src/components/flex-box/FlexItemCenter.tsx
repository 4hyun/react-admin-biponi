import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const FlexItemCenter: FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" alignItems="center" {...props}>
    {children}
  </Box>
);

export default FlexItemCenter;
