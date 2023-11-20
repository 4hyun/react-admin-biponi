import { ReactElement, useState } from "react";
import { Box, styled, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SettingsIcon from "@mui/icons-material/Settings";
// custom components
import Card1 from "components/Card1";
import GeneralForm from "components/site-settings/GeneralForm";
import ShippingTax from "components/site-settings/ShippingTax";
import SocialLinks from "components/site-settings/SocialLinks";
import BannerSlider from "components/site-settings/BannerSlider";
import FooterSetting from "components/site-settings/FooterSetting";
import TopbarSetting from "components/site-settings/TopbarSetting";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";

// styled component
const StyledTabPanel = styled(TabPanel)({
  paddingLeft: 0,
  paddingRight: 0,
  paddingBottom: 0,
});

const AccountSettings: NextPageWithLayout = () => {
  const [selectTab, setSelectTab] = useState("general");

  return (
    <Card1>
      <TabContext value={selectTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={(_, value) => setSelectTab(value)} variant="scrollable">
            <Tab label="General" value="general" disableRipple />
            <Tab label="Topbar" value="topbar" disableRipple />
            <Tab label="Footer" value="footer" disableRipple />
            <Tab label="Social Links" value="social-links" disableRipple />
            <Tab label="Banner Slider" value="banner-slider" disableRipple />
            <Tab label="Shipping & Vat" value="shipping-vat" disableRipple />
          </TabList>
        </Box>

        <StyledTabPanel value="general">
          <GeneralForm />
        </StyledTabPanel>

        <StyledTabPanel value="topbar">
          <TopbarSetting />
        </StyledTabPanel>

        <StyledTabPanel value="footer">
          <FooterSetting />
        </StyledTabPanel>

        <StyledTabPanel value="social-links">
          <SocialLinks />
        </StyledTabPanel>

        <StyledTabPanel value="banner-slider">
          <BannerSlider />
        </StyledTabPanel>

        <StyledTabPanel value="shipping-vat">
          <ShippingTax />
        </StyledTabPanel>
      </TabContext>
    </Card1>
  );
};

// ==============================================================
AccountSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader title="Site Settings" Icon={SettingsIcon} />
      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default AccountSettings;
