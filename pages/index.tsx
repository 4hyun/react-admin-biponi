import { GetStaticProps } from "next";
import { Fragment, ReactElement, useCallback, useState } from "react";
import Box from "@mui/material/Box";
// page sections
import HomeFooter from "page-sections/home/HomeFooter";
import HeroSection from "page-sections/home/HeroSection";
import AllProducts from "page-sections/home/AllProducts";
import ServiceSection from "page-sections/home/ServiceSection";
import DiscountSection from "page-sections/home/DiscountSection";
import ProductCarousel from "page-sections/home/ProductCarousel";
// layout
import type { NextPageWithLayout } from "./_app";
import SecondaryLayout from "components/layouts/SecondaryLayout";
// custom components
import HomeSideBarNav from "components/page-sidenav/HomeSideBarNav";
import SidenavContainer from "components/sidenav-container/SidenavContainer";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
// custom hook
import useCategoryBasedProducts from "hooks/useCategoryBasedProducts";
// database connection
import connectDB from "__server__/db";
// data base query strings
import { db_slug } from "utils/constants";
// data models
import Settings from "__server__/model/Settings";
import ProductModel from "__server__/model/Product";
import Product_Type from "__server__/model/ProductType";
import Service_Type from "__server__/model/ServiceType";
import Category_Nav_List from "__server__/model/CategoryNavList";
// types and utils
import stringify from "__server__/utils/stringify";
import { BannerItem, Category, Product, Service, SliderProductType } from "__types__/common";

// ==============================================================
interface Props {
  bannerText: string;
  bannerImage: string;
  allProducts: Product[];
  serviceList: Service[];
  bannerSlider: BannerItem[];
  categoryNavList: Category[];
  productTypeList: SliderProductType[];
}
// ==============================================================

const HomePage: NextPageWithLayout<Props> = (props) => {
  const {
    bannerText,
    bannerImage,
    allProducts = [],
    serviceList = [],
    bannerSlider = [],
    categoryNavList = [],
    productTypeList = [],
  } = props;

  const { loading, selectedCategory, handleChangeCategory, categoryBasedProducts } =
    useCategoryBasedProducts();

  // in mobile sidebar state
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleSideBarOpen = () => setOpenSideBar(true);
  const handleSideBarClose = () => setOpenSideBar(false);

  // category sidebar
  const SideBar = useCallback(() => {
    return (
      <HomeSideBarNav
        navList={categoryNavList}
        selectedCategory={selectedCategory}
        handleChangeCategory={handleChangeCategory}
      />
    );
  }, [categoryNavList, handleChangeCategory, selectedCategory]);

  return (
    <Fragment>
      {/* HERO BANNER SECTION */}
      <HeroSection bannerText={bannerText} bannerImage={bannerImage} />

      {/* SERVICE LIST SECTION */}
      <Box id="service" py={10}>
        {serviceList.length > 0 && <ServiceSection services={serviceList} />}
      </Box>

      <SidenavContainer navFixedComponentID="service" SideNav={SideBar}>
        {/* TRENDING & ALL PRODUCTS SECTION */}
        {selectedCategory ? (
          <Box mb={6} minHeight={475}>
            <AllProducts
              loading={loading}
              heading={selectedCategory}
              products={categoryBasedProducts}
            />
          </Box>
        ) : (
          <Fragment>
            {productTypeList.map((item) => (
              <ProductCarousel
                key={item._id}
                title={item.heading}
                products={item.products}
                subTitle={item.description || ""}
              />
            ))}

            <Box mb={6} mt={3}>
              <AllProducts products={allProducts} />
            </Box>
          </Fragment>
        )}

        {/* DISCOUNT BANNER SECTION IF EXISTS DISCOUNT */}
        {bannerSlider.length > 0 && (
          <Box mb={6} mt={3}>
            <DiscountSection items={bannerSlider} />
          </Box>
        )}

        {/* FOOTER SECTION */}
        <HomeFooter />
      </SidenavContainer>

      {/* in mobile device show this navbar  */}
      <MobileNavigationBar
        open={openSideBar}
        handleOpen={handleSideBarOpen}
        handleClose={handleSideBarClose}
      >
        <HomeSideBarNav
          navList={categoryNavList}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
          handleCloseMobileSideBar={handleSideBarClose}
        />
      </MobileNavigationBar>
    </Fragment>
  );
};

// ==============================================================
HomePage.getLayout = function getLayout(page: ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
// ==============================================================

export const getStaticProps: GetStaticProps = async () => {
  // connect database
  await connectDB();

  // get all products
  const allProduct = stringify(await ProductModel.find().sort("-createdAt"));

  // get all types product list
  const productTypeList = stringify(await Product_Type.find().populate("products"));

  // get all category nav list
  const getCategoryNavList = stringify(
    await Category_Nav_List.findOne({ slug: db_slug.category_nav }).populate("categories")
  );

  // get all service list
  const getServiceType = stringify(
    await Service_Type.findOne({ slug: db_slug.services }).populate("services")
  );

  // get site general setting
  const generalSetting = stringify(await Settings.findOne({ slug: db_slug.general_site_setting }));

  // get bottom slide setting
  const bannerSlider = stringify(await Settings.findOne({ slug: db_slug.banner_slider }));

  return {
    props: {
      allProducts: allProduct,
      productTypeList: productTypeList ?? [],
      bannerSlider: bannerSlider?.values || [],
      serviceList: getServiceType?.services ?? [],
      categoryNavList: getCategoryNavList?.categories ?? [],
      bannerText: generalSetting?.values?.site_banner_text || "",
      bannerImage: generalSetting?.values?.site_banner.location || "",
    },
    revalidate: 30,
  };
};

export default HomePage;
