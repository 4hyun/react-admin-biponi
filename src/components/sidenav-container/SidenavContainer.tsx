import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import clsx from "clsx";
// constant utils
import { layoutConstant } from "utils/constants";
// styled component
import { StyledContainer } from "./styled";

// ===========================================================================
interface SidenavContainerProps extends PropsWithChildren {
  SideNav: () => JSX.Element;
  navFixedComponentID: string;
}
// ===========================================================================

const SidenavContainer: FC<SidenavContainerProps> = (props) => {
  const { SideNav, children, navFixedComponentID } = props;

  const [isSidenavFixed, setSidenavFixed] = useState<boolean>(false);

  const scrollListener = useCallback(() => {
    const element = document.getElementById(navFixedComponentID)!;
    const bottom =
      element.getBoundingClientRect().bottom + window.scrollY - layoutConstant.headerHeight;

    setSidenavFixed(window.pageYOffset > bottom);
  }, [navFixedComponentID]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <StyledContainer id="products">
      <Box mt={isSidenavFixed ? 2 : 0} className={clsx({ sidenav: true, fixed: isSidenavFixed })}>
        <SideNav />
        {/* {SideNav} */}
      </Box>

      <Box className={clsx({ pageContent: true, pageContentShifted: isSidenavFixed })}>
        {children}
      </Box>
    </StyledContainer>
  );
};

export default SidenavContainer;
