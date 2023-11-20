import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik } from "formik";
import axios from "axios";
// custom component
import Loading from "components/Loading";
// custom hook
import useFetchSiteSetting from "hooks/useFetchSiteSetting";
// api route param slug list
import { db_slug } from "utils/constants";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";

const ShippingTax: FC = () => {
  const [loadingButton, setLoadingButton] = useState(false);
  const { data, loading, refetch } = useFetchSiteSetting(`/api/settings/${db_slug.shipping_vat}`);

  const initialValues = {
    vat: data?.vat || 0,
    shipping: data?.shipping_charge || 0,
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    if (values.vat === "" || values.shipping === "") {
      return toast.error("Please provide vat and shipping value!");
    }

    setLoadingButton(true);

    try {
      await axios.post("/api/settings/shipping-vat", {
        vat: values.vat,
        name: "Shipping and Vat",
        shipping: values.shipping,
      });

      toast.success("Data updated successfully");
      refetch();
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (loading) return <Loading />;

  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item md={7} xs={12}>
              <TextField
                fullWidth
                type="number"
                name="shipping"
                onBlur={handleBlur}
                label="Shipping Charge"
                onChange={handleChange}
                value={values.shipping}
              />
            </Grid>

            <Grid item md={7} xs={12}>
              <TextField
                fullWidth
                name="vat"
                type="number"
                label="VAT (%)"
                value={values.vat}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={loadingButton}
              >
                Save Changes
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default ShippingTax;
