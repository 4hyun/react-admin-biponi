import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMediaQuery, useTheme } from "@mui/material";
import Cookies from "js-cookie";
// custom contexts
import { useAppContext } from "contexts/AppContext";
import { useSettingContext } from "contexts/SettingContext";

const useHeader = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data: session } = useSession();

  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.up("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const toggleDialog = () => setDialogOpen((state) => !state);
  const toggleSideNav = () => setSideNavOpen((state) => !state);

  const { state, dispatch } = useAppContext();
  const { cartList } = state.cart || {};

  const { generalSetting } = useSettingContext();

  useEffect(() => {
    if (Cookies.get("cart")) dispatch({ type: "INITIAL_CART" });
  }, [dispatch]);

  return {
    session,
    dialogOpen,
    sideNavOpen,
    anchorEl,
    isMedium,
    isMobile,
    cartList,
    generalSetting,
    setAnchorEl,
    toggleDialog,
    toggleSideNav,
    setDialogOpen,
    setSideNavOpen,
  };
};

export default useHeader;
