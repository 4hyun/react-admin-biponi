import NextImage from "next/image";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { Button, Container, keyframes, styled, Box } from "@mui/material";
import clsx from "clsx";
import FlexBox from "components/flex-box/FlexBox";

const headerHeight = 72;

const slideFromTop = keyframes`
from { top: -${headerHeight}px; }
to { top: 0; }`;

const HeaderWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "absolute",
  height: headerHeight,
  "& .link": {
    cursor: "pointer",
    transition: "color 250ms ease-in-out",
    "&:hover": { color: theme.palette.primary.main },
  },

  "&.fixedHeader": {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
    position: "fixed",
    background: "white",
    height: headerHeight,
    boxShadow: theme.shadows[2],
    "& .link": { color: "inherit" },
    animation: `${slideFromTop} 250ms ease-in-out`,
  },
}));

const Header: FC = () => {
  const [isFixed, setFixed] = useState(false);

  const scrollListener = useCallback(() => {
    if (window?.pageYOffset >= headerHeight + 300) setFixed(true);
    else setFixed(false);
  }, []);

  useEffect(() => {
    if (!window) return;

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, [scrollListener]);

  return (
    <Fragment>
      <HeaderWrapper className={clsx({ fixedHeader: isFixed })}>
        <Container>
          <FlexBox justifyContent="space-between" alignItems="center" height={headerHeight}>
            <Box sx={{ cursor: "pointer", width: 120, height: 40, position: "relative" }}>
              <NextImage src="/assets/images/black-logo.svg" alt="logo" fill />
            </Box>

            {/* <FlexBox className="right-links" alignItems="center">
            <Scroll to="features" duration={400} offset={-headerHeight - 16} smooth={true}>
              <Typography className="link" color="grey.600" p="0.25rem 1.25rem">
                Features
              </Typography>
            </Scroll>

            <Scroll to="demos" duration={400} offset={-headerHeight - 16} smooth={true}>
              <Typography className="link" color="grey.600" p="0.25rem 1.25rem">
                Demos
              </Typography>
            </Scroll>

            <Scroll to="technologies" duration={400} offset={-headerHeight - 16} smooth={true}>
              <Typography className="link" color="grey.600" p="0.25rem 1.25rem">
                Technologies
              </Typography>
            </Scroll>
          </FlexBox> */}

            <a href="#" target="_blank">
              <Button variant="outlined" color="primary">
                Purchase Now
              </Button>
            </a>
          </FlexBox>
        </Container>
      </HeaderWrapper>

      <Box sx={{ height: isFixed ? headerHeight : 0 }} />
    </Fragment>
  );
};

export default Header;
