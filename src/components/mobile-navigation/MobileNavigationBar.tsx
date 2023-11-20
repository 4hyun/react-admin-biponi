import { FC, Fragment, ReactNode, useState } from "react";
import { Badge, Box, Drawer } from "@mui/material";
// custom icons
import Home from "components/icons/Home";
import User2 from "components/icons/User2";
import CategoryOutlined from "components/icons/CategoryOutline";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/mini-cart/MiniCart";
// custom context
import { useAppContext } from "contexts/AppContext";
// custom hook
import useWindowSize from "hooks/useWindowSize";
// custom styled components
import { StyledBox, StyledDrawer, StyledNavLink, Wrapper } from "./styles";

// =========================================================================
interface MobileNavigationBarProps {
  open: boolean;
  children?: ReactNode;
  handleOpen: () => void;
  handleClose: () => void;
}
// =========================================================================

const MobileNavigationBar: FC<MobileNavigationBarProps> = (props) => {
  const { children, open, handleClose, handleOpen } = props;

  const { state } = useAppContext();
  const { cartList } = state.cart || {};

  const width = useWindowSize();
  const [openCart, setOpenCart] = useState(false);
  const handleCloseCart = () => setOpenCart(false);

  const iconStyle = {
    display: "flex",
    marginBottom: "4px",
    alignItems: "center",
    justifyContent: "center",
  };

  return width <= 900 ? (
    <Box position="relative" display="flex" flexDirection="column">
      <StyledDrawer open={open} anchor="left" onClose={handleClose}>
        {children}
      </StyledDrawer>

      <Drawer open={openCart} anchor="right" onClose={handleCloseCart}>
        <MiniCart toggleSidenav={handleCloseCart} />
      </Drawer>

      <Wrapper>
        {list.map((item) => {
          if (item.href) {
            return (
              <StyledNavLink href={item.href} key={item.title}>
                {item.title === "Cart" ? (
                  <Badge badgeContent={cartList.length} color="primary">
                    <item.icon fontSize="small" sx={iconStyle} />
                  </Badge>
                ) : (
                  <item.icon sx={iconStyle} fontSize="small" />
                )}

                {item.title}
              </StyledNavLink>
            );
          } else {
            return (
              <Fragment key={item.title}>
                {item.title === "Cart" ? (
                  <StyledBox onClick={() => setOpenCart(true)}>
                    <Badge badgeContent={cartList.length} color="primary">
                      <item.icon fontSize="small" sx={iconStyle} />
                    </Badge>
                    {item.title}
                  </StyledBox>
                ) : (
                  <StyledBox onClick={handleOpen}>
                    <item.icon sx={iconStyle} fontSize="small" />
                    {item.title}
                  </StyledBox>
                )}
              </Fragment>
            );
          }
        })}
      </Wrapper>
    </Box>
  ) : null;
};

const list = [
  { title: "Home", icon: Home, href: "/" },
  { title: "Category", icon: CategoryOutlined },
  { title: "Cart", icon: ShoppingBagOutlined },
  { title: "Account", icon: User2, href: "/profile" },
];

export default MobileNavigationBar;
