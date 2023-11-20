import { Box, Card, Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)({
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
});

export const StyledCard = styled(Card)(({ theme }) => ({
  width: 500,
  [theme.breakpoints.down("sm")]: { width: "100%" },

  ".content": {
    textAlign: "center",
    padding: "3rem 3.75rem 0px",
    [theme.breakpoints.down("sm")]: { padding: "1.5rem 1rem 0px" },
  },

  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

export const LoginAccessWrapper = styled(Box)(({ theme }) => ({
  display: "grid",
  borderRadius: "4px",
  marginBottom: "1rem",
  alignItems: "center",
  padding: ".5rem 1rem",
  gridTemplateColumns: "2fr 1fr 1fr",
  border: `1px solid ${theme.palette.grey[100]}`,
  "& p": { justifySelf: "start" },
}));
