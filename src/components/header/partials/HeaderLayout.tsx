import { FC, ReactElement } from "react";
import { signOut } from "next-auth/react";
import PersonOutline from "@mui/icons-material/PersonOutline";
import clsx from "clsx";
import {
  Box,
  Menu,
  Badge,
  Avatar,
  Drawer,
  Dialog,
  SxProps,
  MenuItem,
  Container,
  IconButton,
} from "@mui/material";
// custom components
import Login from "page-sections/sessions/Login";
import NavLink from "components/nav-link/NavLink";
import MiniCart from "components/mini-cart/MiniCart";
import { FlexItemCenter } from "components/flex-box";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
// styled component
import { HeaderWrapper } from "./styled";
import { StyledCard } from "page-sections/sessions/partial/styled";
// header hook for header related functionality
import useHeader from "./useHeader";

// =======================================================================
type LayoutProps = {
  className?: string;
  actionStyles?: SxProps;
  LogoComponent: ReactElement;
  SearchComponent: ReactElement;
};
// =======================================================================

const HeaderLayout: FC<LayoutProps> = ({
  className,
  LogoComponent,
  SearchComponent,
  actionStyles = {},
}) => {
  const {
    dialogOpen,
    isMobile,
    session,
    anchorEl,
    cartList,
    sideNavOpen,
    setAnchorEl,
    toggleDialog,
    toggleSideNav,
    setDialogOpen,
  } = useHeader();

  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* website logo */}
        {LogoComponent}

        {/* search box for product search */}
        {SearchComponent}

        <FlexItemCenter sx={actionStyles}>
          {session?.user ? (
            <>
              <Avatar
                src={session.user.avatar}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ cursor: "pointer" }}
              />

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
                sx={{ zIndex: 2001 }}
              >
                <NavLink href="/profile">
                  <MenuItem>Profile</MenuItem>
                </NavLink>

                <NavLink href="/orders">
                  <MenuItem>Account</MenuItem>
                </NavLink>

                {session?.user.role === "admin" && (
                  <NavLink href="/admin/dashboard">
                    <MenuItem>Admin Dashboard</MenuItem>
                  </NavLink>
                )}

                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box component={IconButton} ml={2} p={1.25} bgcolor="grey.200" onClick={toggleDialog}>
              <PersonOutline />
            </Box>
          )}

          <Badge badgeContent={cartList.length} color="primary">
            <Box
              ml={2.5}
              p={1.25}
              bgcolor="grey.200"
              component={IconButton}
              onClick={toggleSideNav}
            >
              <ShoppingBagOutlined />
            </Box>
          </Badge>
        </FlexItemCenter>

        <Dialog open={dialogOpen} fullWidth={isMobile} scroll="body" onClose={toggleDialog}>
          <StyledCard>
            <Login dialogClose={() => setDialogOpen(false)} />
          </StyledCard>
        </Dialog>

        <Drawer
          anchor="right"
          open={sideNavOpen}
          onClose={toggleSideNav}
          //   SlideProps={{ style: { overflow: "hidden" } }}
        >
          <MiniCart toggleSidenav={toggleSideNav} />
        </Drawer>
      </Container>
    </HeaderWrapper>
  );
};

export default HeaderLayout;
