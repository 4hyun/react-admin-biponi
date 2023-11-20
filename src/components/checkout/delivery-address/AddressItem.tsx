import { FC } from "react";
import { Card, Grid, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
// custom components
import { FlexBox } from "components/flex-box";
import { H6, Paragraph } from "components/Typography";
// address data type for typescript
import { Address } from "__types__/common";

// ==============================================================
type Props = {
  address: Address;
  isActive: boolean;
  handleEditAddress: () => void;
  handleSelectAddress: () => void;
  handleDeleteAddress: (id: string) => void;
};
// ==============================================================

const AddressItem: FC<Props> = (props) => {
  const { address, isActive, handleDeleteAddress, handleEditAddress, handleSelectAddress } = props;

  const { street1, street2, name, country, zip, phone, state, _id } = address || {};

  return (
    <Grid item md={4} sm={6} xs={12}>
      <Card
        onClick={handleSelectAddress}
        sx={{
          p: "1rem",
          cursor: "pointer",
          boxShadow: "none",
          border: "1px solid",
          position: "relative",
          backgroundColor: "grey.100",
          borderColor: isActive ? "primary.main" : "transparent",
        }}
      >
        <FlexBox justifyContent="flex-end" sx={{ position: "absolute", top: 10, right: 5 }}>
          <IconButton size="small" onClick={handleEditAddress}>
            <ModeEditOutlineIcon sx={{ fontSize: 18 }} />
          </IconButton>

          <IconButton size="small" color="error" onClick={() => handleDeleteAddress(_id!)}>
            <DeleteOutlineIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </FlexBox>

        <H6 mb={0.5}>{name}</H6>
        <Paragraph color="grey.700">{`${street1}, ${zip}, ${state}`}</Paragraph>
        {street2 && <Paragraph color="grey.700">{street2}</Paragraph>}
        <Paragraph color="grey.700">{country}</Paragraph>
        <Paragraph color="grey.700">{phone}</Paragraph>
      </Card>
    </Grid>
  );
};

export default AddressItem;
