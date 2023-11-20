import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, FC, PropsWithChildren } from "react";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

// styled component
const StyledLink = styled(Link)<{ active: number }>(({ theme, active }) => ({
  position: "relative",
  transition: "color 150ms ease-in-out",
  color: active ? theme.palette.primary.main : "inherit",
  "&:hover": { color: `${theme.palette.primary.main} !important` },
}));

// ==============================================================
export interface NavLinkProps extends PropsWithChildren {
  href: string;
  className?: string;
  style?: CSSProperties;
}
// ==============================================================

const NavLink: FC<NavLinkProps> = ({ href, children, style = {}, className }) => {
  const { pathname } = useRouter();

  const checkRouteMatch = () => {
    return href === "/" ? pathname === href : pathname.includes(href);
  };

  return (
    <StyledLink
      href={href}
      className={clsx(className)}
      active={checkRouteMatch() ? 1 : 0}
      style={style}
    >
      {children}
    </StyledLink>
  );
};

export default NavLink;
