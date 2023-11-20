import Menu from "@mui/material/Menu";
import { Children, cloneElement, FC, Fragment, ReactElement, useState } from "react";

// ==============================================================
interface MenuProps {
  style?: any;
  open?: boolean;
  className?: string;
  elevation?: number;
  handler: ReactElement;
  shouldCloseOnItemClick?: boolean;
  direction?: "left" | "right" | "center";
  children: ReactElement | ReactElement[];
}
// ==============================================================

const AppMenu: FC<MenuProps> = ({
  open,
  handler,
  children,
  direction,
  shouldCloseOnItemClick,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMenuItemClick = (customOnClick: any) => () => {
    if (customOnClick) customOnClick();
    if (shouldCloseOnItemClick) handleClose();
  };

  return (
    <Fragment>
      {handler && cloneElement(handler, { onClick: handler.props.onClick || handleClick })}

      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open !== undefined ? open : !!anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: direction || "left" }}
        transformOrigin={{ vertical: "top", horizontal: direction || "left" }}
        {...props}
      >
        {Children.map(children, (child: ReactElement) =>
          cloneElement(child, { onClick: handleMenuItemClick(child.props.onClick) })
        )}
      </Menu>
    </Fragment>
  );
};

AppMenu.defaultProps = {
  direction: "left",
  shouldCloseOnItemClick: true,
};

export default AppMenu;
