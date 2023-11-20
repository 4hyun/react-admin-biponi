import { ReactElement, useState } from "react";
import Router, { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Card,
  Grid,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { Formik } from "formik";
import toast from "react-hot-toast";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";
// components
import Loading from "components/Loading";
import User2 from "components/icons/User2";
import getHeaderLink from "components/getHeaderLink";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// user data type for typescript
import { User } from "__types__/common";

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  // password: yup
  //   .string()
  //   .min(6, "Password must be 6 characters length")
  //   .required("Password is required"),
});

const UserDetails: NextPageWithLayout = () => {
  const { query } = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);
  const { data: user, isLoading } = useSWR<User>(`/api/users/${query.id}`);

  const initialValues = {
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    password: "",
    role: user?.role || "user",
    phone: user?.phone || "",
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    try {
      const { first_name, last_name, email, password, role, phone } = values;

      await axios.put(`/api/users`, {
        role,
        email,
        phone,
        password,
        last_name,
        first_name,
        id: query.id,
      });
      toast.success("User updated successfully");
      Router.push("/admin/users");
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading />;

  return (
    <Card sx={{ p: "30px" }}>
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
                  name="first_name"
                  label="First Name"
                  placeholder="John"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  error={!!touched.first_name && !!errors.first_name}
                  helperText={(touched.first_name && errors.first_name) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  placeholder="Doe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  error={!!touched.last_name && !!errors.last_name}
                  helperText={(touched.last_name && errors.last_name) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="email@domain.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={(touched.email && errors.email) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone"
                  placeholder="00 000 0000"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  error={!!touched.phone && !!errors.phone}
                  helperText={(touched.phone && errors.phone) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="*******"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={!!touched.password && !!errors.password}
                  helperText={(touched.password && errors.password) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="role">User Role</InputLabel>
                  <Select
                    name="role"
                    labelId="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                    input={<OutlinedInput label="Select Role" />}
                    error={!!touched.role && !!errors.role}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  loading={loadingButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save User
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

// ==============================================================
UserDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        Icon={User2}
        title="Edit User"
        button={getHeaderLink("/admin/users", "Back to User List")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default UserDetails;
