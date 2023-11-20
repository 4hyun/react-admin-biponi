import { Box, styled } from "@mui/material";
import AppCard from "components/AppCard";
import { Span } from "components/Typography";

const NavbarRoot = styled(AppCard)<{ fixed: number }>(({ fixed }) => ({
  height: "100%",
  boxShadow: "none",
  borderRadius: "8px",
  position: "relative",
  overflow: fixed ? "auto" : "unset",
  "& .linkList": { transition: "all 0.2s", padding: "8px 20px" },
}));

const BorderBox = styled(Box)({
  marginTop: 5,
  display: "flex",
  marginBottom: 15,
  alignItems: "flex-end",
  justifyContent: "space-between",
  "& span": { width: "100%" },
});

const Span1 = styled(Span)({
  height: "3px",
  borderRadius: "2px 0 0 2px",
});

const Span2 = styled(Span)(({ theme }) => ({
  height: "2px",
  borderRadius: "0 2px 2px 0",
  background: theme.palette.grey[300],
}));

export { NavbarRoot, BorderBox, Span1, Span2 };
