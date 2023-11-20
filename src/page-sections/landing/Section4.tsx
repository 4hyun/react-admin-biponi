import { FC } from "react";
import { Box, Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { H1, Paragraph, Span } from "components/Typography";

const Section4: FC = () => {
  return (
    <Box mt={8}>
      <Container>
        <H1 fontWeight={700} fontSize={28} textAlign="center" mb={1}>
          <Span color="primary.main">Frontend</Span> Design
        </H1>

        <Paragraph
          textAlign="center"
          fontWeight={600}
          color="grey.700"
          maxWidth={400}
          mx="auto"
          mb={6}
        >
          Unique shop design to make your business a true eCommerce platform
        </Paragraph>

        <Box my={5}>
          <Carousel totalSlides={3} visibleSlides={1} autoPlay currentSlide={0}>
            {[
              "/assets/images/landing/vendor/page-1.png",
              "/assets/images/landing/vendor/page-2.png",
              "/assets/images/landing/vendor/page-3.png",
            ].map((item, i) => {
              // eslint-disable-next-line @next/next/no-img-element
              return <img src={item} alt="Slide" key={i} />;
            })}
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
};

export default Section4;
