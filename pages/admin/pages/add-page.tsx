import Router from "next/router";
import React, { ReactElement, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Card, Grid, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
// custom components
import ReactQuill from "components/ReactQuill";
import getHeaderLink from "components/getHeaderLink";
import DeliveryBox from "components/icons/DeliveryBox";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout
import { NextPageWithLayout } from "../../_app";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";

const AddPage: NextPageWithLayout = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  const initialValues = { name: "", content: "" };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    content: yup.string().required("Content is required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        const { name, content } = values;
        setLoadingButton(true);

        if (content.length < 20) {
          alert("page content must be upto 20 character length");
          return;
        }

        try {
          const { data } = await axios.post("/api/pages", { name, content });
          toast.success(`${data.name} page created successfully`);
          Router.push("/admin/pages");
          setLoadingButton(false);
        } catch (error) {
          toast.error(getErrorMessage(error));
          setLoadingButton(false);
        }
      },
    });

  const handleContentChange = (value: string) => setFieldValue("content", value);

  return (
    <Card sx={{ p: "30px" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Page Name"
              placeholder="About Us"
              onBlur={handleBlur}
              value={values.name}
              onChange={handleChange}
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
            />
          </Grid>

          <Grid item xs={12}>
            <ReactQuill
              error={errors.content}
              value={values.content}
              onChange={handleContentChange}
            />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loading={loadingButton}
            >
              Save Page
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

// ==============================================================
AddPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Add Page"
        Icon={DeliveryBox}
        button={getHeaderLink("/admin/pages", "Back to Page List")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default AddPage;
