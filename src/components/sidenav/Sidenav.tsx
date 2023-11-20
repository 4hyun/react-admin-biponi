import React, { cloneElement, FC, ReactNode, useEffect, useState } from "react";
import { Drawer, styled } from "@mui/material";
import clsx from "clsx";

const Wrapper = styled("div")({
  "& .handle": { cursor: "pointer" },
});

// ===============================================================
interface SidenavProps {
  open?: boolean;
  width?: number;
  children: ReactNode;
  handle: React.ReactElement;
  toggleSidenav?: () => void;
  position?: "left" | "right";
}
// ===============================================================

const Sidenav: FC<SidenavProps> = (props) => {
  const { position, open, width, handle, children, toggleSidenav } = props;

  const [sidenavOpen, setSidenavOpen] = useState(open);
  const handleToggleSidenav = () => setSidenavOpen(!sidenavOpen);

  useEffect(() => {
    setSidenavOpen(open);
  }, [open]);

  return (
    <Wrapper>
      <Drawer
        anchor={position}
        open={sidenavOpen}
        onClose={toggleSidenav || handleToggleSidenav}
        SlideProps={{ style: { width: width || 280 } }}
      >
        {children}
      </Drawer>

      {handle &&
        cloneElement(handle, {
          className: clsx(handle.props?.className, "handle"),
          onClick: toggleSidenav || handleToggleSidenav,
        })}
    </Wrapper>
  );
};

Sidenav.defaultProps = {
  width: 280,
  open: false,
  position: "left",
};

export default Sidenav;
