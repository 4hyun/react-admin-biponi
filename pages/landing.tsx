import Box from "@mui/material/Box";
// page sections
import Hero from "page-sections/landing/Hero";
import Footer from "page-sections/landing/Footer";
import Header from "page-sections/landing/Header";
import Section5 from "page-sections/landing/Section5";
import Section6 from "page-sections/landing/Section6";

const Landing = () => {
  return (
    <Box overflow="hidden">
      <Header />
      <Hero />
      <Section5 />
      <Section6 />
      <Footer />
    </Box>
  );
};

export default Landing;
