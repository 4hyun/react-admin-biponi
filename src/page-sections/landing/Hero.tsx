import { FC } from "react";
import { Box, Button, Container } from "@mui/material";
import { scroller } from "react-scroll";
// custom components
import { H1, Paragraph } from "components/Typography";
import { FlexCenter, FlexContentCenter } from "components/flex-box";

const Hero: FC = () => {
  return (
    <FlexCenter
      sx={{
        minHeight: 600,
        background: "url(/assets/images/landing/landing-bg-1.svg) center/cover",
      }}
    >
      <Container id="section-1">
        <Box maxWidth="830px" mx="auto" textAlign="center">
          <Paragraph color="primary.main" fontSize={20}>
            MOST POWERFUL
          </Paragraph>

          <H1 color="secondary.main" fontSize={50} mb={1}>
            Biponi eCommerce CMS
          </H1>

          <Paragraph color="grey.700" fontSize={18}>
            A Powerful SEO Friendly Next.js eCommerce CMS
          </Paragraph>

          <FlexContentCenter gap={2} m={6}>
            <a onClick={() => scroller.scrollTo("demos", { smooth: true })}>
              <Button variant="contained" color="primary">
                Browse Frontend
              </Button>
            </a>

            <a href="/admin/dashboard" target="_blank">
              <Button variant="outlined" color="primary">
                Browse Admin
              </Button>
            </a>
          </FlexContentCenter>
        </Box>
      </Container>
    </FlexCenter>
  );
};

export default Hero;
