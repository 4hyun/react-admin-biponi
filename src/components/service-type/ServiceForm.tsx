import { FC, useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";
// custom component
import { H3 } from "components/Typography";
// util function for error message
import getErrorMessage from "utils/getErrorMessage";
// database route param slugs
import { db_slug } from "utils/constants";
// service data type for typescript
import { Service } from "__types__/common";

// ====================================================
type ServiceFormProps = {
  open: boolean;
  service?: Service;
  close: () => void;
  fetchService: () => void;
};
// ====================================================

const ServiceForm: FC<ServiceFormProps> = ({ open, close, fetchService, service }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const checkoutSchema = yup.object().shape({
    title: yup.string().required("Service Name is required"),
    icon: yup.string().required("Icon name is required"),
    subTitle: yup.string().required("Sub Title is required"),
  });

  const initialValues = {
    icon: service?.icon || "",
    title: service?.title || "",
    subTitle: service?.subTitle || "",
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingButton(true);

    try {
      const { title, icon, subTitle } = values;

      if (!service) {
        // create new service
        const { data } = await axios.post("/api/service", { title, icon, subTitle });
        // added service in service-type list
        await axios.put(`/api/service-type/${db_slug.services}`, { service: data._id });
        toast.success("Service created successfully");
      } else {
        // update service
        await axios.put(`/api/service/${service.slug}`, { title, icon, subTitle });
        toast.success("Service updated successfully");
      }

      setLoadingButton(false);
      fetchService();
      close();
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>
        <H3>Add New Service</H3>
      </DialogTitle>

      <DialogContent sx={{ pt: "10px !important" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="title"
                onBlur={handleBlur}
                value={values.title}
                label="Service title"
                onChange={handleChange}
                error={!!touched.title && !!errors.title}
                helperText={(touched.title && errors.title) as string}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                name="subTitle"
                onBlur={handleBlur}
                value={values.subTitle}
                onChange={handleChange}
                label="Service Sub Title"
                error={!!touched.subTitle && !!errors.subTitle}
                helperText={(touched.subTitle && errors.subTitle) as string}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                name="icon"
                label="Icon Name"
                value={values.icon}
                onBlur={handleBlur}
                onChange={handleChange}
                error={!!touched.icon && !!errors.icon}
                helperText={(touched.icon && errors.icon) as string}
              />

              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={loadingButton}
                sx={{ mt: "25px" }}
              >
                {service ? "Update" : "Create"}
              </LoadingButton>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceForm;
