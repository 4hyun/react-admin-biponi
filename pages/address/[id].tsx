import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Place } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";
// custom components
import Card1 from "components/Card1";
import Loading from "components/Loading";
import { Paragraph } from "components/Typography";
import getHeaderLink from "components/getHeaderLink";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "components/layouts/user-dashboard/Layout";
// utils function for get error message
import getErrorMessage from "utils/getErrorMessage";
// address data type for typescript
import { Address } from "__types__/common";

const AddressDetails: NextPageWithLayout = () => {
  const { query, push } = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);

  const { data: address, error, isLoading } = useSWR<Address>(`/api/address/${query.id}`);

  const checkoutSchema = yup.object({
    name: yup.string().required("required"),
    street1: yup.string().required("required"),
    street2: yup.string(),
    phone: yup.number().required("required"),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
    country: yup.string().required("required"),
    zip: yup.number().required("required"),
  });

  const initialValues: Address = {
    name: address?.name || "",
    street1: address?.street1 || "",
    street2: address?.street2 || "",
    phone: address?.phone || "",
    city: address?.city || "",
    state: address?.state || "",
    country: address?.country || "",
    zip: address?.zip || 0,
  };

  // handle form submit
  const handleFormSubmit = async (values: Address) => {
    setLoadingButton(true);

    try {
      const { data } = await axios.put(`/api/address/${query.id}`, values);
      toast.success(`${data._id} Updated Successfully`);
      push("/address");
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  // SHOW LOADING INDICATOR
  if (isLoading) return <Loading />;

  // ERROR HANDLING
  if (error) return <Paragraph>Something Error Occurred!</Paragraph>;

  return (
    <Card1>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Enter Your Name"
                  helperText={touched.name && errors.name}
                  error={touched.name && Boolean(errors.name)}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="street1"
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  label="Zip"
                  type="number"
                  value={values.zip}
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
                  value={values.country}
                  onChange={handleChange}
                  helperText={touched.country && errors.country}
                  error={touched.country && Boolean(errors.country)}
                />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={loadingButton}
                >
                  Update Address
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card1>
  );
};

// =================================================================
AddressDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserDashboardLayout>
      <DashboardPageHeader
        Icon={Place}
        title="Add New Address"
        button={getHeaderLink("/address", "Back to Address")}
      />
      {page}
    </UserDashboardLayout>
  );
};
// =================================================================

export default AddressDetails;
