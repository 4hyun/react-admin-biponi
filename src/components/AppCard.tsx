import { FC } from "react";
import { Card, CardProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type AppCardProps = { hoverEffect?: boolean };

const AppCard = styled<FC<AppCardProps & CardProps>>(({ hoverEffect, children, ...rest }) => (
  <Card {...rest}>{children}</Card>
))<AppCardProps>(({ theme, hoverEffect }) => ({
  overflow: "unset",
  borderRadius: "8px",
  transition: "all 250ms ease-in-out",
  "&:hover": { boxShadow: hoverEffect ? theme.shadows[3] : "" },
}));

AppCard.defaultProps = { hoverEffect: false };

export default AppCard;
