import { FC } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import { H2, Paragraph } from "components/Typography";
import PageCard from "./PageCard";

const Section5: FC = () => {
  return (
    <Box
      mt={8}
      id="demos"
      sx={{ background: "url(/assets/images/landing/landing-bg-2.svg) center no-repeat" }}
    >
      <Container id="section-3" sx={{ position: "relative" }}>
        <H2 fontWeight={700} fontSize={28} textAlign="center">
          Shop Variations
        </H2>

        <Paragraph
          textAlign="center"
          fontWeight={600}
          color="grey.700"
          maxWidth={400}
          mx="auto"
          mb={6}
        >
          Build any type of store with Biponi
        </Paragraph>

        <Grid container spacing={4}>
          {demoPageList.map((item, i) => (
            <Grid item sm={6} xs={12} key={item.title}>
              <PageCard {...item} />
            </Grid>
          ))}
        </Grid>

        <a href="/" target="_blank">
          <Button
            color="primary"
            variant="contained"
            sx={{ display: "block", minWidth: "125px", mx: "auto", mt: "2.25rem" }}
          >
            Purchase Now
          </Button>
        </a>
      </Container>
    </Box>
  );
};

const demoPageList = [
  {
    title: "Grocery Store",
    previewUrl: "https://biponi.vercel.app",
    imgUrl: "/assets/images/landing/grocery-1.png",
  },
  {
    title: "Furniture Store",
    imgUrl: "/assets/images/landing/furniture-1.png",
    previewUrl: "https://biponi-furniture.vercel.app",
  },
  {
    title: "Fashion Store",
    imgUrl: "/assets/images/landing/fashion-1.png",
    previewUrl: "https://biponi-fashion-store.vercel.app",
  },
];

export default Section5;
