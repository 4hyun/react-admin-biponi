import { FC } from "react";
import { Button, Dialog, DialogContent, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Address } from "__types__/common";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  street1: yup.string().required("Street1 is required"),
  street2: yup.string(),
  phone: yup.number().required("Phone is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  country: yup.string().required("Country is required"),
  zip: yup.number().required("Zip Code is required"),
});

// ==================================================================
interface EditAddressFormProps {
  addressData: Address;
  openEditForm: boolean;
  setOpenEditForm: (value: boolean) => void;
  handleEditAddress: (id: string, address: Address) => Promise<void>;
}
// ==================================================================

const EditAddressForm: FC<EditAddressFormProps> = (props) => {
  const { addressData, openEditForm, setOpenEditForm, handleEditAddress } = props;

  const initialValues = {
    name: addressData.name,
    street1: addressData.street1,
    street2: addressData.street2,
    phone: addressData.phone,
    city: addressData.city,
    state: addressData.state,
    country: addressData.country,
    zip: addressData.zip,
  };
  const { values, errors, handleChange, handleSubmit, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (addressData._id) {
        handleEditAddress(addressData._id, values);
      }
    },
  });

  return (
    <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
      <DialogContent>
        <Typography variant="h6" mb={3}>
          Edit Address Information
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="name"
                value={values.name}
                label="Enter Your Name"
                onChange={handleChange}
                helperText={touched.name && errors.name}
                error={touched.name && Boolean(errors.name)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="street1"
                label="Street line 1"
                value={values.street1}
                onChange={handleChange}
                helperText={touched.street1 && errors.street1}
                error={touched.street1 && Boolean(errors.street1)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="text"
                name="street2"
                label="Street line 2"
                value={values.street2}
                onChange={handleChange}
                helperText={touched.street2 && errors.street2}
                error={touched.street2 && Boolean(errors.street2)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                type="number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                label="Enter Your Phone"
                helperText={touched.phone && errors.phone}
                error={touched.phone && Boolean(errors.phone)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="city"
                label="City"
                value={values.city}
                onChange={handleChange}
                helperText={touched.city && errors.city}
                error={touched.city && Boolean(errors.city)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="state"
                label="State"
                value={values.state}
                onChange={handleChange}
                helperText={touched.state && errors.state}
                error={touched.state && Boolean(errors.state)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="zip"
                type="number"
                label="Zip Code"
                value={values.zip}
                onChange={handleChange}
                helperText={touched.zip && errors.zip}
                error={touched.zip && Boolean(errors.zip)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                fullWidth
                name="country"
                label="Country"
                value={values.country}
                onChange={handleChange}
                helperText={touched.country && errors.country}
                error={touched.country && Boolean(errors.country)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddressForm;
