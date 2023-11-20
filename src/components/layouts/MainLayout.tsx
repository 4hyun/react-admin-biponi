import Head from "next/head";
import { FC, Fragment, ReactElement, ReactNode, useEffect, useState } from "react";
import axios from "axios";
// custom components
import Sticky from "components/sticky/Sticky";
import Topbar from "components/topbar/Topbar";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import HomeSideBarNav from "components/page-sidenav/HomeSideBarNav";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
// custom hook
import useCategoryBasedProducts from "hooks/useCategoryBasedProducts";
// database query slugs
import { db_slug } from "utils/constants";

// ===============================================================
type MainLayoutProps = {
  title?: string;
  children: ReactNode;
  navbar?: ReactElement;
};
// ===============================================================

const MainLayout: FC<MainLayoutProps> = ({
  children,
  navbar,
  title = "React Next.js Ecommerce Template",
}) => {
  // const [isFixed, setIsFixed] = useState(false);
  const [categoryNav, setCategoryNav] = useState([]);
  const [openMobileSidebar, setOpenMobileSideBar] = useState(false);
  const { handleChangeCategory } = useCategoryBasedProducts();

  // const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);

  useEffect(() => {
    axios
      .get(`/api/category-navlist/${db_slug.category_nav}`)
      .then(({ data }) => setCategoryNav(data));
  }, []);

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      {/* TOPBAR SECTION */}
      <Topbar />

      {/* HEADER SECTION */}
      <Sticky fixedOn={0}>
        <Header />
      </Sticky>

      {/* IF NAVBAR EXIST */}
      {navbar && <div className="section-after-sticky">{navbar}</div>}

      {/* IF NAVBAR NOT EXIST */}
      {!navbar ? <div className="section-after-sticky">{children}</div> : children}

      {/* FOOTER SECTION */}
      <Footer />

      {/* MOBILE DEVICE BOTTOM NAV BAR */}
      <MobileNavigationBar
        open={openMobileSidebar}
        handleOpen={() => setOpenMobileSideBar(true)}
        handleClose={() => setOpenMobileSideBar(false)}
      >
        <HomeSideBarNav
          navList={categoryNav}
          handleChangeCategory={handleChangeCategory}
          handleCloseMobileSideBar={() => setOpenMobileSideBar(false)}
        />
      </MobileNavigationBar>
    </Fragment>
  );
};

export default MainLayout;
