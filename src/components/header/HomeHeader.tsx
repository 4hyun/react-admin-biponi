import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
// custom components
import FlexBox from "components/flex-box/FlexBox";
import HomeSearchBox from "components/search-box/HomeSearchBox";
// reusable header layout component
import HeaderLayout from "./partials/HeaderLayout";
// header hook for header related functionality
import useHeader from "./partials/useHeader";

// =======================================================================
type HomeHeaderProps = { className?: string; isFixed?: boolean };
// =======================================================================

const HomeHeader: FC<HomeHeaderProps> = ({ isFixed }) => {
  const { generalSetting, isMedium } = useHeader();

  const LogoComponent = (
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
  );

  const SearchComponent = (
    <FlexBox
      flex="1 1 0"
      justifyContent="center"
      sx={{ visibility: isFixed && isMedium ? "visible" : "hidden" }}
    >
      <HomeSearchBox />
    </FlexBox>
  );

  return <HeaderLayout LogoComponent={LogoComponent} SearchComponent={SearchComponent} />;
};

export default HomeHeader;
