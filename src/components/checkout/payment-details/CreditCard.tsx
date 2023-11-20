import { FC } from "react";
import Image from "next/image";
import { Box, Card, Grid } from "@mui/material";
import { Paragraph } from "components/Typography";
import { CreditCard } from "__types__/common";

// ==============================================================
type Props = {
  card: CreditCard;
  isActive: boolean;
  handleToggleSavedCard: (item: CreditCard) => void;
};
// ==============================================================

const CreditCard: FC<Props> = ({ isActive, card, handleToggleSavedCard }) => {
  const { cardType, cardLast4, name } = card || {};

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Card
        onClick={() => handleToggleSavedCard(card)}
        sx={{
          p: "1rem",
          boxShadow: "none",
          cursor: "pointer",
          border: "1px solid",
          backgroundColor: "grey.100",
          borderColor: isActive ? "primary.main" : "transparent",
        }}
      >
        <Box height={24} width={36} position="relative" mb={1}>
          <Image fill alt={cardType} src={`/assets/images/payment-methods/${cardType}.svg`} />
        </Box>

        <Paragraph color="grey.700">**** **** **** {cardLast4}</Paragraph>
        <Paragraph color="grey.700">{name}</Paragraph>
      </Card>
    </Grid>
  );
};

export default CreditCard;
