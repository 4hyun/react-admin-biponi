import { ReactElement, useState } from "react";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CameraEnhance from "@mui/icons-material/CameraEnhance";
import Person from "@mui/icons-material/Person";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";
// custom components
import Card1 from "components/Card1";
import Loading from "components/Loading";
import { Paragraph } from "components/Typography";
import FlexBox from "components/flex-box/FlexBox";
import getHeaderLink from "components/getHeaderLink";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout component
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "components/layouts/user-dashboard/Layout";
// utils function for error message
import getErrorMessage from "utils/getErrorMessage";
// user data type for typescript
import { User } from "__types__/common";

const ProfileEditor: NextPageWithLayout = () => {
  const [file, setFile] = useState<File>();
  const [loadingButton, setLoadingButton] = useState(false);

  const { data: userInfo, error, mutate, isLoading } = useSWR<User>("/api/users/details");

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingButton(true);

    try {
      const formData = new FormData();

      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("phone", values.contact);
      formData.append("dateOfBirth", JSON.stringify(values.birth_date));

      if (file) formData.append("file", file);

      if (userInfo) {
        await axios.put(`/api/users/${userInfo._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(`Profile Updated Successfully!`);
        mutate();
        setLoadingButton(false);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  const initialValues = {
    first_name: userInfo?.first_name || "",
    last_name: userInfo?.last_name || "",
    email: userInfo?.email || "",
    contact: userInfo?.phone || "",
    birth_date: userInfo?.dateOfBirth || new Date().toISOString(),
  };

  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    birth_date: yup.date().required("invalid date"),
  });

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading height={200} />;

  // SHOW ERROR MESSAGE WHEN A ERROR OCCUR
  if (error) return <Paragraph>Something Error Occurred!</Paragraph>;

  return (
    <Card1>
      <FlexBox alignItems="flex-end" mb={3}>
        <Avatar src={userInfo?.avatar} sx={{ height: 64, width: 64 }} />

        <Box ml={-2.5}>
          <label htmlFor="profile-image">
            <Button
              component="span"
              color="secondary"
              sx={{ bgcolor: "grey.300", height: "auto", p: "8px", borderRadius: "50%" }}
            >
              <CameraEnhance fontSize="small" />
            </Button>
          </label>
        </Box>

        <Box display="none">
          <input
            type="file"
            accept="image/*"
            id="profile-image"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
        </Box>
      </FlexBox>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue }) => (
          <form onSubmit={handleSubmit} method="put" encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="first_name"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  error={!!touched.first_name && !!errors.first_name}
                  helperText={(touched.first_name && errors.first_name) as string}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  error={!!touched.last_name && !!errors.last_name}
                  helperText={(touched.last_name && errors.last_name) as string}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  error={!!touched.email && !!errors.email}
                  helperText={(touched.email && errors.email) as string}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="contact"
                  onBlur={handleBlur}
                  value={values.contact}
                  onChange={handleChange}
                  error={!!touched.contact && !!errors.contact}
                  helperText={(touched.contact && errors.contact) as string}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Birth Date"
                    // maxDate={new Date()}

                    value={new Date(values.birth_date)}
                    onChange={(newValue) => setFieldValue("birth_date", newValue)}
                    slots={{ textField: TextField }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        error: !!touched.birth_date && !!errors.birth_date,
                        helperText: (touched.birth_date && errors.birth_date) as string,
                      },
                    }}
                  />
                </LocalizationProvider>
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
    </Card1>
  );
};

// =================================================================
ProfileEditor.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserDashboardLayout>
      <DashboardPageHeader
        Icon={Person}
        title="My Profile"
        button={getHeaderLink("/profile", "Back to Profile")}
      />
      {page}
    </UserDashboardLayout>
  );
};
// =================================================================

export default ProfileEditor;
