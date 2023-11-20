import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
// custom component
import { H1, Small } from "components/Typography";
import AppTextField from "components/AppTextField";
import { FlexCenter, FlexBox } from "components/flex-box";
// styled component
import { StyledContainer } from "page-sections/sessions/partial/styled";
// utils function for error message
import getErrorMessage from "utils/getErrorMessage";

const ResetNewPassword: NextPage = () => {
  const { query, push } = useRouter();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, "Password must be 6 characters length")
      .required("${path} is required"),

    confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (query) {
          const slug = query.slug as string[];
          const URI = `/api/auth/reset-password/${slug[0]}/${slug[1]}`;
          await axios.post(URI, { password: values.password });
          toast.success("Password Updated Successfully");
          push("/login");
        } else {
          toast.error("Invalid Link");
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
  });

  return (
    <StyledContainer>
      <Card sx={{ padding: 4, maxWidth: 600, marginTop: 4, boxShadow: 1 }}>
        <FlexCenter flexDirection="column" mb={5}>
          <H1 fontSize={24} fontWeight={700}>
            Set your new password
          </H1>
        </FlexCenter>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my={2}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <AppTextField
              fullWidth
              name="password"
              type="password"
              label="New Password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              helperText={touched.password && errors.password}
              error={Boolean(touched.password && errors.password)}
              sx={{ mb: 2 }}
            />

            <AppTextField
              fullWidth
              type="password"
              name="confirmPassword"
              label="Confirm New Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            />

            <Box sx={{ mt: 4 }}>
              <LoadingButton
                fullWidth
                type="submit"
                loading={false}
                color="primary"
                variant="contained"
              >
                Update
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

export default ResetNewPassword;
