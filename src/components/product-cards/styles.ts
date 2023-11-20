import { Box, Chip, styled } from "@mui/material";
import AppCard from "components/AppCard";

const StyledBazarCard = styled(AppCard)(({ theme }) => ({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  "&:hover": { boxShadow: theme.shadows[2] },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  height: "100%",
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: { display: "block" },
}));

const StyledChip = styled(Chip)({
  zIndex: 11,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
});

const ContentWrapper = styled(Box)({
  padding: "1rem",
  "& .title": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

export { StyledBazarCard, ImageWrapper, StyledChip, ContentWrapper };
