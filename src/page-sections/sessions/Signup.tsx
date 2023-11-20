import { FC, Fragment, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import * as yup from "yup";
// custom components
import AppTextField from "components/AppTextField";
import { H3, H6, Paragraph, Small } from "components/Typography";
import { FlexBox, FlexCenter } from "components/flex-box";
// context
import { useSettingContext } from "contexts/SettingContext";
// utils function
import getErrorMessage from "utils/getErrorMessage";
// partial session based component
import ForgetPassword from "./partial/ForgetPassword";
// custom password visibility hook
import usePasswordVisibilityBtn from "./partial/usePasswordVisibilityBtn";

const Signup: FC = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  const { generalSetting } = useSettingContext();
  const { PasswordVisibilityButton, passwordVisibility } = usePasswordVisibilityBtn();

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingButton(true);

    try {
      await axios.post("/api/auth/register", {
        email: values.email,
        password: values.password,
        last_name: values.lastName,
        first_name: values.firstName,
        re_password: values.re_password,
        termsAndCondition: values.agreement,
      });

      await signIn("credentials", { email: values.email, password: values.password });
      toast.success("Register successfully");
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
  });

  return (
    <Fragment>
      <form className="content" onSubmit={handleSubmit}>
        <NextImage
          priority
          alt="logo"
          height={46}
          width={136}
          src={generalSetting.site_logo.location}
        />

        <H3 mb={1} mt={2}>
          Create Your Account
        </H3>

        <Small mb={4.5} fontSize="12px" display="block" fontWeight="600" color="grey.800">
          Please fill all fields to continue
        </Small>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <AppTextField
              mb={1.5}
              fullWidth
              size="small"
              name="firstName"
              label="First Name"
              variant="outlined"
              placeholder="Ralph"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              error={!!touched.firstName && !!errors.firstName}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <AppTextField
              mb={1.5}
              fullWidth
              size="small"
              name="lastName"
              label="Last Name"
              variant="outlined"
              placeholder="Adwards"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              error={!!touched.lastName && !!errors.lastName}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
        </Grid>

        <AppTextField
          mb={1.5}
          fullWidth
          name="email"
          type="email"
          size="small"
          label="Email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <AppTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{ endAdornment: PasswordVisibilityButton }}
        />

        <AppTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label="Retype Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
          InputProps={{ endAdornment: PasswordVisibilityButton }}
        />

        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          control={<Checkbox size="small" color="secondary" checked={values.agreement || false} />}
          label={
            <FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">
              By signing up, you agree to
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>
          }
        />

        <LoadingButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{ height: 44 }}
          loading={loadingButton}
          disabled={values.agreement === false}
        >
          Create Account
        </LoadingButton>

        <FlexCenter my={3} gap={1}>
          <Paragraph>Already have an account?</Paragraph>

          <Link href="/login">
            <H6 borderBottom="1px solid" borderColor="grey.900">
              Log In
            </H6>
          </Link>
        </FlexCenter>
      </form>

      {/* FORGET PASSWORD BLOCK */}
      <ForgetPassword />
    </Fragment>
  );
};

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};

const formSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be 6 characters length"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!"),
});

export default Signup;
