import Head from "next/head";
import { FC, Fragment, PropsWithChildren, useCallback, useState } from "react";
import Box from "@mui/material/Box";
// custom components
import Sticky from "components/sticky/Sticky";
import Topbar from "components/topbar/Topbar";
import HomeHeader from "components/header/HomeHeader";

// ==============================================================
interface SecondaryLayoutProps extends PropsWithChildren {
  title?: string;
}
// ==============================================================

const SecondaryLayout: FC<SecondaryLayoutProps> = ({
  children,
  title = "React Next.js Ecommerce Template",
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      {/* TOPBAR AREA */}
      <Topbar />

      {/* HEADER AREA */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed}>
        <HomeHeader isFixed={isFixed} />
      </Sticky>

      {/* CONTENT AREA */}
      <Box position="relative" bgcolor="white">
        {children}
      </Box>
    </Fragment>
  );
};

export default SecondaryLayout;
