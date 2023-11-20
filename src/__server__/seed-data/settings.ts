export default [
  {
    name: "general-site-setting",
    slug: "general-site-setting",
    values: {
      site_name: "Bazaar NextJS Template",
      site_description: "Fully Ecommerce System",
      site_banner_text: "Get your grocery delivery within 30 minutes",
      site_logo: {
        location: "https://bazar-website.s3.ap-south-1.amazonaws.com/black-logo-1653564567053.png",
      },
      site_banner: {
        location: "https://bazar-website.s3.ap-south-1.amazonaws.com/bg-1647929160987.png",
      },
    },
  },

  {
    name: "social-links-setting",
    slug: "social-links-setting",
    values: {
      appLinks: [
        { name: "Google Play", link: "/" },
        { name: "App Store", link: "/" },
      ],
      socialLinks: [
        { name: "Facebook", link: "https://www.facebook.com/UILibOfficial", icon: "Facebook" },
        { name: "Twitter", link: "https://twitter.com/uilibofficial", icon: "Twitter" },
        { name: "Instagram", link: "https://www.instagram.com/uilibofficial", icon: "Instagram" },
        { name: "Youtube", link: "", icon: "Youtube" },
      ],
    },
  },

  {
    name: "Topbar Setting",
    slug: "topbar-setting",
    values: {
      phone: "+8801234567894",
      email: "support@ui-lib.com",
      links: [
        { id: 1647181742841, name: "Theme FAQ's", link: "/" },
        { id: 1647417316401, name: "Help", link: "/" },
      ],
    },
  },

  {
    name: "Footer Setting",
    slug: "footer-setting",
    values: {
      column_two: {
        heading: "About Us",
        links: [
          { id: 1, name: "Careers", link: "/" },
          { id: 1647240152518, name: "Our Cares", link: "/" },
          { id: 1647240164224, name: "Our Store", link: "/" },
          { id: 1647240173488, name: "Privacy Policy", link: "/" },
          { id: 1647240186412, name: "Terms & Conditions", link: "" },
        ],
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.",
      column_three: {
        heading: "Customer Care",
        links: [
          { id: 1, name: "How to Buy", link: "/" },
          { id: 1647240219117, name: "Help Center", link: "/" },
          { id: 1647240229339, name: "Track Your Order", link: "/" },
          { id: 1647240240185, name: "Return & Refunds", link: "/" },
          { id: 1647240252981, name: "Corporate & Bulk Purchasing", link: "/" },
        ],
      },
      column_four: {
        heading: "Contact Us",
        description:
          "<p>70 Washington Square South, New York, NY 10012, United States of America</p><p>Email:&nbsp;uilib.help@gmail.com</p><p>Phone:&nbsp;+11123456780</p>",
      },
      logo: {
        location: "https://bazar-website.s3.ap-south-1.amazonaws.com/logo-white-1647240539596.png",
      },
    },
  },

  {
    name: "Banner Slider Setting",
    slug: "banner-slider-setting",
    values: [
      {
        location: "https://bazar-website.s3.ap-south-1.amazonaws.com/01-1648740566715.jpg",
      },
      {
        location: "https://bazar-website.s3.ap-south-1.amazonaws.com/2-1648740566712.jpg",
      },
      {
        location: "https://bazar-website.s3.ap-south-1.amazonaws.com/3-1648740566708.jpg",
      },
      {
        location: "https://bazar-website.s3.ap-south-1.amazonaws.com/4-1648740566706.jpg",
      },
    ],
  },
  {
    _id: "624ca9c56b705e48f64dfc04",
    name: "Shipping and Vat",
    slug: "shipping-and-vat",
    values: { vat: 0, shipping_charge: 0 },
  },
];
