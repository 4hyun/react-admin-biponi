import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const Pages = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M15,3H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2H15a2,2,0,0,0,2-2V5A2,2,0,0,0,15,3Zm6,3V18a1,1,0,0,1-1,1H19V5h1A1,1,0,0,1,21,6Z" />
    </SvgIcon>
  );
};

export default Pages;
