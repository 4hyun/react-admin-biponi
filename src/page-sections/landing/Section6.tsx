import { Box, Card, Container, Grid, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import { H2, H4, Span } from "components/Typography";

const StyledContent = styled(Box)(({ theme }) => ({
  zIndex: 1,
  position: "relative",
  "&:after": {
    top: 0,
    right: 0,
    zIndex: -1,
    width: 150,
    height: 150,
    marginTop: -51,
    content: '" "',
    marginRight: -75,
    position: "absolute",
    background: "#fbeef0",
    borderRadius: "300px",
  },
  "&:before": {
    left: 0,
    bottom: 0,
    width: 150,
    zIndex: -1,
    height: 150,
    content: '" "',
    marginLeft: -75,
    marginBottom: -75,
    position: "absolute",
    borderRadius: "300px",
    background: theme.palette.grey[300],
  },
}));

const Section6 = () => {
  return (
    <Container id="technologies" sx={{ my: 12 }}>
      <H2 fontWeight={700} fontSize={28} mb={4} textAlign="center">
        <Span color="primary.main">Technologies</Span> Used
      </H2>

      <StyledContent>
        <Grid container spacing={3}>
          {list.map((item) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={item.title}>
              <Card
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "260px",
                  boxShadow: "large",
                }}
              >
                <Box mb={2}>
                  <LazyImage
                    src={item.imgUrl}
                    height={60}
                    width={60}
                    // objectFit="contain"
                    // objectPosition="center"
                    alt=""
                  />
                </Box>

                <H4 fontSize="18px" fontWeight="700" maxWidth="200px" textAlign="center" mx="auto">
                  {item.title}
                </H4>
              </Card>
            </Grid>
          ))}
        </Grid>
      </StyledContent>
    </Container>
  );
};

const list = [
  {
    imgUrl: "/assets/images/logos/react.png",
    title: "React",
  },
  {
    imgUrl: "/assets/images/logos/next-js.png",
    title: "Next.js",
  },
  {
    imgUrl: "/assets/images/logos/typescript.png",
    title: "TypeScript",
  },
  {
    imgUrl: "/assets/images/logos/mui.svg",
    title: "Material-UI",
  },
];

export default Section6;
