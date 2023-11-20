import { FC, useEffect } from "react";
import { CircularProgress, FormHelperText, Grid } from "@mui/material";
import { ErrorMessage } from "formik";
// custom components
import TitleBar from "../TitleBar";
import Card1 from "components/Card1";
import AddressItem from "./AddressItem";
import NewAddressForm from "./NewAddressForm";
import EditAddressForm from "./EditAddressForm";
import { FlexBetween } from "components/flex-box";
// custom hook delivery address functionality
import useDeliveryAddress from "./useDeliveryAddress";

// ============================================================
type DeliveryAddressProps = {
  values: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};
// ============================================================

const DeliveryAddress: FC<DeliveryAddressProps> = (props) => {
  const { values, setFieldValue } = props;

  const {
    handleCreateAddress,
    handleDeleteAddress,
    handleEditAddress,
    handleEditBtn,
    loading,
    addressData,
    openEditAddressForm,
    editAddress,
    handleOpenEditAddressForm,
  } = useDeliveryAddress();

  useEffect(() => {
    if (addressData.length > 0) {
      setFieldValue("address", addressData[0]);
    }
  }, [addressData, setFieldValue]);

  return (
    <Card1 sx={{ mb: 3 }}>
      <FlexBetween>
        <TitleBar title="Delivery Address" number={2} />
        <NewAddressForm setNewAddress={handleCreateAddress} />
      </FlexBetween>

      {/* ADDRESS LIST AREA */}
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <Grid container spacing={3}>
          {addressData.map((address) => (
            <AddressItem
              key={address._id}
              address={address}
              isActive={address.name === values.address.name}
              handleEditAddress={() => handleEditBtn(address)}
              handleSelectAddress={() => setFieldValue("address", address)}
              handleDeleteAddress={() => handleDeleteAddress(address._id!)}
            />
          ))}
        </Grid>
      )}

      {/* SHOW EDIT ADDRESS FORM MODAL WHEN EDITABLE TRUE */}
      {openEditAddressForm && editAddress && (
        <EditAddressForm
          addressData={editAddress}
          openEditForm={openEditAddressForm}
          handleEditAddress={handleEditAddress}
          setOpenEditForm={handleOpenEditAddressForm}
        />
      )}

      <ErrorMessage name="address" render={(msg) => <FormHelperText error>{msg}</FormHelperText>} />
    </Card1>
  );
};

export default DeliveryAddress;
