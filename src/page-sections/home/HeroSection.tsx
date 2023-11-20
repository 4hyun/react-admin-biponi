import { FC } from "react";
import Link from "next/link";
import { scroller } from "react-scroll";
import { Box, Card, MenuItem, styled, TextField } from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
// custom components
import { H1, Paragraph } from "../../components/Typography";
// custom hook for product searching
import useProductSearch from "hooks/useProductSearch";

// styled components
const Container = styled(Box)<{ img: string }>(({ theme, img }) => ({
  width: "100%",
  height: 650,
  padding: 20,
  paddingTop: 160,
  backgroundColor: theme.palette.grey[100],
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  transition: "all .3s",
  backgroundPosition: "bottom",

  "& h1": {
    fontSize: 42,
    lineHeight: 1.3,
    marginBottom: 40,
    textAlign: "center",
  },
  "& .searchBox": {
    margin: "auto",
    maxWidth: "600px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: theme.shadows[2],
  },
  [theme.breakpoints.down("md")]: {
    height: 550,
    paddingTop: 130,
    "& h1": { fontSize: 38, textAlign: "center" },
  },
  [theme.breakpoints.down("sm")]: {
    height: 350,
    paddingTop: 70,
    "& h1": { fontSize: 30 },
    "& .searchBox": { margin: 0 },
  },
}));

const ScrollLink = styled(Box)(({ theme }) => ({
  fontSize: 14,
  marginTop: 24,
  display: "flex",
  fontWeight: 600,
  cursor: "pointer",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

// ============================================================================
type HeroSectionProps = { bannerText: string; bannerImage: string };
// ============================================================================

const HeroSection: FC<HeroSectionProps> = ({ bannerText, bannerImage }) => {
  const { search, resultList, notFoundResult } = useProductSearch();

  return (
    <Container img={bannerImage}>
      <H1 maxWidth={650} mx="auto">
        {bannerText}
      </H1>

      <Box className="searchBox" position="relative">
        <TextField
          fullWidth
          placeholder="Searching for..."
          onChange={search}
          InputProps={{
            startAdornment: <SearchOutlined fontSize="small" sx={{ color: "grey.600", mr: 1 }} />,
            sx: {
              pr: 0,
              height: 50,
              color: "grey.700",
              background: "#fff",
              "& fieldset": { border: "none" },
            },
          }}
        />

        {resultList.length > 0 && (
          <Card elevation={2} sx={{ py: 1 }}>
            {resultList.map((item) => (
              <Link href={`/product/${item._id}`} key={item._id}>
                <MenuItem>{item.item}</MenuItem>
              </Link>
            ))}
          </Card>
        )}

        {notFoundResult && (
          <Card elevation={2} sx={{ py: 1 }}>
            <Paragraph p={2}>Not Found Products</Paragraph>
          </Card>
        )}
      </Box>

      <ScrollLink onClick={() => scroller.scrollTo("products", { smooth: true, offset: -200 })}>
        Browse Products
      </ScrollLink>
    </Container>
  );
};

export default HeroSection;
