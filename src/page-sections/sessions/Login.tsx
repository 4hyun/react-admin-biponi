import Link from "next/link";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { FC, useState, Fragment } from "react";
import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
// custom components
import FlexBox from "components/flex-box/FlexBox";
import AppTextField from "components/AppTextField";
import { H3, H6, Paragraph, Small } from "components/Typography";
// custom context
import { useSettingContext } from "contexts/SettingContext";
// util function
import getErrorMessage from "utils/getErrorMessage";
// partial session based component & styled component
import ForgetPassword from "./partial/ForgetPassword";
import { LoginAccessWrapper } from "./partial/styled";
// custom password visibility hook
import usePasswordVisibilityBtn from "./partial/usePasswordVisibilityBtn";

// ==============================================================
type LoginProps = { dialogClose?: Function };
// ==============================================================

const Login: FC<LoginProps> = ({ dialogClose }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const router = useRouter();
  const { callbackUrl } = router.query;
  const { generalSetting } = useSettingContext();
  const { PasswordVisibilityButton, passwordVisibility } = usePasswordVisibilityBtn();

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingButton(true);

    try {
      const data = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (data?.error) {
        toast.error(data.error);
        setLoadingButton(false);
        return;
      }

      dialogClose?.();
      router.replace(callbackUrl ? `${callbackUrl}` : "/");
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <Fragment>
      <form className="content" onSubmit={handleSubmit}>
        <NextImage
          priority
          height={46}
          width={136}
          alt="bazaar-logo"
          src={generalSetting.site_logo.location}
        />

        <H3 mt={2} mb={1}>
          Welcome To Ecommerce
        </H3>

        <Small mb={4.5} fontSize="12px" display="block" fontWeight="600" color="grey.800">
          Log in with email & password
        </Small>

        <AppTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email or Phone Number"
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <AppTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          InputProps={{ endAdornment: PasswordVisibilityButton }}
        />

        <LoadingButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          loading={loadingButton}
          sx={{ height: 44 }}
        >
          Login
        </LoadingButton>

        <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
          <Box>Don’t have account?</Box>
          <Link href="/signup">
            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
              Sign Up
            </H6>
          </Link>
        </FlexBox>

        <LoginAccessWrapper>
          <Paragraph>admin@example.com</Paragraph>
          <Paragraph>123456</Paragraph>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setFieldValue("email", "admin@example.com");
              setFieldValue("password", "123456");
            }}
          >
            copy
          </Button>
        </LoginAccessWrapper>

        <LoginAccessWrapper>
          <Paragraph>user@example.com</Paragraph>
          <Paragraph>user123</Paragraph>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setFieldValue("email", "user@example.com");
              setFieldValue("password", "user123");
            }}
          >
            copy
          </Button>
        </LoginAccessWrapper>
      </form>

      {/* FORGET PASSWORD BLOCK */}
      <ForgetPassword />
    </Fragment>
  );
};

const initialValues = { email: "", password: "" };

const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
});

export default Login;
