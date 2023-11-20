import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import NavLink, { NavLinkProps } from "components/nav-link/NavLink";

export const NavigationWrapper = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "calc(100vh - 64px)",
    boxShadow: "none",
    overflowY: "auto",
  },
}));

interface Props extends NavLinkProps {
  isCurrentPath: boolean;
}

export const DashboardNavItem = styled(NavLink)<Props>(({ theme, isCurrentPath }) => ({
  display: "flex",
  alignItems: "center",
  paddingBlock: ".5rem",
  paddingInline: "1.5rem",
  justifyContent: "space-between",
  borderLeft: `4px solid ${isCurrentPath ? theme.palette.primary.main : "transparent"}`,

  "& .nav-icon": {
    color: isCurrentPath ? theme.palette.primary.main : theme.palette.grey[600],
  },

  "&:hover": {
    borderColor: theme.palette.primary.main,
    "& .nav-icon": { color: theme.palette.primary.main },
  },
}));
