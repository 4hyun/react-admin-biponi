import Link from "next/link";
import { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import axios from "axios";
// custom components
import { H1, Small } from "components/Typography";
import AppTextField from "components/AppTextField";
import { FlexCenter, FlexBox } from "components/flex-box";
// styled component
import { StyledContainer } from "page-sections/sessions/partial/styled";
// utils function for error message
import getErrorMessage from "utils/getErrorMessage";

const ResetPassword: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = { email: "" };

  const validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("${path} is required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post("/api/auth/reset-password", { email: values.email });
        Router.push("/reset-password/email-sent");
        setLoading(false);
      } catch (error) {
        toast.error(getErrorMessage(error));
        setLoading(false);
      }
    },
  });

  return (
    <StyledContainer>
      <Card sx={{ padding: 4, maxWidth: 600, marginTop: 4, boxShadow: 1 }}>
        <FlexCenter flexDirection="column" mb={5}>
          <H1 fontSize={24} fontWeight={700}>
            Reset your password
          </H1>
        </FlexCenter>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <AppTextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <Box sx={{ mt: 4 }}>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                loading={loading}
                variant="contained"
              >
                Reset
              </LoadingButton>
            </Box>
          </form>

          <Small fontWeight="medium" margin="auto" mt={3}>
            Don't have an account?{" "}
            <Small color="primary.main">
              <Link href="/signup">Create an account</Link>
            </Small>
          </Small>
        </FlexBox>
      </Card>
    </StyledContainer>
  );
};

export default ResetPassword;
