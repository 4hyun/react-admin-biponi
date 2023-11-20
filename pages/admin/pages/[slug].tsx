import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { Card, Grid, TextField } from "@mui/material";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import ReactQuill from "components/ReactQuill";
import getErrorMessage from "utils/getErrorMessage";
import getHeaderLink from "components/getHeaderLink";
import DeliveryBox from "components/icons/DeliveryBox";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";

const EditPage: NextPageWithLayout = () => {
  const { query, push } = useRouter();
  const [loadingButton, setLoadingButton] = useState(false);
  const { data: page, isLoading } = useSWR(`/api/pages/${query.slug}`);

  // INITIAL FORM FIELD VALUES
  const initialValues = {
    name: page?.name || "",
    content: page?.content || "",
  };

  // FORM FIELD VALIDATION SCHEMA
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    content: yup.string().required("Content is required"),
  });

  // HANDLE EDIT FROM SUBMIT
  const handleFormSubmit = async (values: typeof initialValues) => {
    const { name, content } = values;
    setLoadingButton(true);

    if (content.length < 20) {
      alert("page content must be upto 20 character length");
      return;
    }

    try {
      const { data } = await axios.put(`/api/pages/${query.slug}`, { name, content });
      toast.success(`${data.name} page created successfully`);
      push("/admin/pages");
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
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => {
          // handle content change
          const handleContentChange = (value: string) => setFieldValue("content", value);

          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Page Name"
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="About Us"
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={(touched.name && errors.name) as string}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ReactQuill value={values.content} onChange={handleContentChange} />
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
          );
        }}
      </Formik>
    </Card>
  );
};

// ==============================================================
EditPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Edit Page"
        Icon={DeliveryBox}
        button={getHeaderLink("/admin/pages", "Back to Page List")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default EditPage;
