import Router from "next/router";
import { ReactElement, useState } from "react";
import CreditCard from "@mui/icons-material/CreditCard";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import * as yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import toast from "react-hot-toast";
// custom components
import Card1 from "components/Card1";
import getHeaderLink from "components/getHeaderLink";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "components/layouts/user-dashboard/Layout";
// utils function for get error message
import getErrorMessage from "utils/getErrorMessage";

const PaymentMethodEditor: NextPageWithLayout = () => {
  const session = useSession();
  const { user } = session.data || {};
  const [loadingButton, setLoadingButton] = useState(false);

  const initialValues = {
    cvc: "",
    email: "",
    card_no: "",
    exp_year: "",
    exp_month: "",
    card_holder_name: "",
  };

  const checkoutSchema = yup.object().shape({
    email: yup.string().required("required"),
    card_no: yup.string().required("required"),
    exp_year: yup.string().required("required"),
    exp_month: yup.string().required("required"),
    cvc: yup.string().required("required"),
    card_holder_name: yup.string().required("required"),
  });

  const handleFormSubmit = async (values: any) => {
    setLoadingButton(false);

    try {
      const { data: customer } = await axios.post("/api/stripe", { email: user?.email });
      await axios.post("/api/stripe/card", {
        customerId: customer.id,
        cardName: values.card_holder_name,
        cardNumber: values.card_no,
        cardExpMonth: values.exp_month,
        cardExpYear: values.exp_year,
        cardCVC: values.exp_year,
      });

      toast.success("New Card Created Successfully");
      Router.push("/payment-methods");
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  return (
    <Card1>
      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box mb={4}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="card_holder_name"
                    label="Card Holder Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.card_holder_name}
                    error={!!touched.card_holder_name && !!errors.card_holder_name}
                    helperText={(touched.card_holder_name && errors.card_holder_name) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={!!touched.email && !!errors.email}
                    helperText={(touched.email && errors.email) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="card_no"
                    label="Card Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.card_no || ""}
                    error={!!touched.card_no && !!errors.card_no}
                    helperText={(touched.card_no && errors.card_no) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="exp_year"
                    label="Exp. Year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.exp_year}
                    error={!!touched.exp_year && !!errors.exp_year}
                    helperText={(touched.exp_year && errors.exp_year) as string}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="exp_month"
                    label="Exp. Month"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.exp_month}
                    error={!!touched.exp_month && !!errors.exp_month}
                    helperText={(touched.exp_month && errors.exp_month) as string}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="cvc"
                    label="CVC"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.cvc || ""}
                    error={!!touched.cvc && !!errors.cvc}
                    helperText={(touched.cvc && errors.cvc) as string}
                  />
                </Grid>
              </Grid>
            </Box>

            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loading={loadingButton}
            >
              Create
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Card1>
  );
};

// =================================================================
PaymentMethodEditor.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserDashboardLayout>
      <DashboardPageHeader
        Icon={CreditCard}
        title="Add New Payment Method"
        button={getHeaderLink("/payment-methods", "Back to Payment Methods")}
      />
      {page}
    </UserDashboardLayout>
  );
};
// =================================================================

export default PaymentMethodEditor;
