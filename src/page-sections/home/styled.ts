import Link from "next/link";
import { Box, styled } from "@mui/material";
// custom components
import { Paragraph } from "components/Typography";
import { FlexItemCenter } from "components/flex-box";

// styled component
export const ServiceItem = styled(FlexItemCenter)(({ theme }) => ({
  flexWrap: "wrap",
  padding: "1.5rem",
  background: "#fff",
  borderRadius: "8px",
  boxShadow: theme.shadows[2],
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    padding: "1rem 0.5rem",
    flexDirection: "column",
  },
}));

export const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

export const DiscountWrapper = styled(Box)({
  borderRadius: "8px",
  overflow: "hidden",
  "& .carousel__slider": { height: 250 },
  "& .carousel-dot div": { height: 10, width: 10 },
  "& .carousel-dot": { left: 0, right: 0, bottom: "10px", position: "absolute" },
  "& img": { width: "100%", backgroundSize: "cover", backgroundPosition: "center" },
});

export const FooterWrapper = styled("footer")(({ theme }) => ({
  padding: 40,
  color: "white",
  borderRadius: 8,
  marginBottom: 16,
  backgroundColor: "#141850",
  [theme.breakpoints.down("md")]: { marginBottom: "4rem" },
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  borderRadius: 4,
  display: "block",
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": { color: theme.palette.grey[100] },
}));
