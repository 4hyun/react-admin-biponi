import { SystemUpdateAlt } from "@mui/icons-material";
import { Box, Container, Grid } from "@mui/material";
import Card1 from "components/Card1";
import FlexBox from "components/flex-box/FlexBox";
import { H1, Paragraph, Span } from "components/Typography";

const Section3 = () => {
  return (
    <Box mt={8}>
      <Container>
        <H1 fontWeight={700} fontSize={28} textAlign="center" mb={1}>
          How Active <Span color="primary.main">eCommerce cms</Span> works?
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

        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={6} md={3} key={item}>
              <Card1>
                <FlexBox
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    backgroundColor: "primary.light",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    margin: "auto",
                  }}
                >
                  <SystemUpdateAlt fontSize="large" />
                </FlexBox>
                <H1 textAlign="center" mt={4}>
                  01
                </H1>
                <Paragraph color="grey.600" textAlign="center">
                  Download and Install Active eCommerce CMS
                </Paragraph>
              </Card1>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Section3;
