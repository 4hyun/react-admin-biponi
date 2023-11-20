export const deviceSize = {
  xs: 425,
  sm: 768,
  md: 1024,
  lg: 1440,
};

export const layoutConstant = {
  topbarHeight: 40,
  headerHeight: 80,
  mobileNavHeight: 64,
  sideBarNavWidth: 280,
  containerWidth: 1200,
  mobileHeaderHeight: 64,
};

export const orderStatusList = [
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

export const db_slug = {
  shipping_vat: "shipping-and-vat",
  services: "grocery-service-list",
  footer_setting: "footer-setting",
  topbar_setting: "topbar-setting",
  social_link: "social-links-setting",
  banner_slider: "banner-slider-setting",
  category_nav: "grocery-category-nav-list",
  general_site_setting: "general-site-setting",
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = Array.from({ length: 10 }).map((_, i) => {
  const date = new Date();
  return date.getFullYear() + i;
});
