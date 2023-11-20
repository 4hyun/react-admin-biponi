import { FC } from "react";
import { useRouter } from "next/router";
import { styled, Box, SvgIconProps, SvgIcon } from "@mui/material";
import Menu from "@mui/icons-material/Menu";
// custom components
import Sidenav from "./sidenav/Sidenav";
import { H2, Span } from "./Typography";
import { FlexBetween, FlexBox, FlexItemCenter } from "./flex-box";
// custom hook
import useWindowSize from "hooks/useWindowSize";
// dashboard sidebar navigation components
import AdminDashboardNavigation from "./layouts/admin-dashboard/Navigations";
import UserDashboardNavigation from "./layouts/user-dashboard/Navigations";

// styled component
const StyledBox = styled(FlexBox)(({ theme }) => ({
  marginTop: theme.spacing(-2),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up("md")]: { "& .sidenav": { display: "none" } },
  [theme.breakpoints.down("md")]: { flexDirection: "column" },
}));

// ==============================================================
interface Props {
  title?: string;
  button?: any;
  navigation?: any;
  subTitle?: string;
  Icon?: typeof SvgIcon | ((props: SvgIconProps) => JSX.Element);
}

// ==============================================================

const DashboardPageHeader: FC<Props> = (props) => {
  const { title, button, subTitle, Icon } = props;

  const width = useWindowSize();
  const isTablet = width < 1025;
  const router = useRouter();

  // condition render sidebar navigation
  const Navigation = router.pathname.startsWith("/admin")
    ? AdminDashboardNavigation
    : UserDashboardNavigation;

  return (
    <StyledBox>
      <FlexBetween flexGrow={1} mt={2} className="headerHold">
        <FlexItemCenter gap={1.5}>
          {Icon ? <Icon color="primary" /> : null}

          <Box>
            <H2 my={0} lineHeight={1} whiteSpace="pre">
              {title}
            </H2>

            {subTitle && (
              <Span fontSize={12} color="primary.main">
                {subTitle}
              </Span>
            )}
          </Box>
        </FlexItemCenter>

        <Box className="sidenav">
          <Sidenav position="left" handle={<Menu fontSize="small" />}>
            <Navigation />
          </Sidenav>
        </Box>

        {!isTablet && button}
      </FlexBetween>

      {isTablet && !!button && <Box mt={2}>{button}</Box>}
    </StyledBox>
  );
};

export default DashboardPageHeader;
