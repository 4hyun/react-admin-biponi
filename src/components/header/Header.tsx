import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
// custom components
import FlexBox from "components/flex-box/FlexBox";
import HomeSearchBox from "components/search-box/HomeSearchBox";
// header hook for header related functionality
import useHeader from "./partials/useHeader";
// reusable header layout component
import HeaderLayout from "./partials/HeaderLayout";

// ===========================================================================
type HeaderProps = { className?: string };
// ===========================================================================

const Header: FC<HeaderProps> = ({ className }) => {
  const { generalSetting } = useHeader();

  const LogoComponent = (
    <Box mr={2} sx={{ display: { xs: "none", md: "block" } }}>
      <Link href="/">
        <Image
          priority
          alt="logo"
          width={100}
          height={125}
          src={generalSetting?.site_logo?.location}
          style={{ objectFit: "contain" }}
        />
      </Link>
    </Box>
  );

  const SearchComponent = (
    <FlexBox justifyContent="center" flex="1 1 0">
      <HomeSearchBox />
    </FlexBox>
  );

  return (
    <HeaderLayout
      className={className}
      LogoComponent={LogoComponent}
      SearchComponent={SearchComponent}
      actionStyles={{ display: { xs: "none", md: "flex" } }}
    />
  );
};

export default Header;
