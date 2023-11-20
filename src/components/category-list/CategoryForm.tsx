import { FC, useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { H3 } from "components/Typography";
import { db_slug } from "utils/constants";
import getErrorMessage from "utils/getErrorMessage";

// ================================================================
type CategoryFormProps = {
  open: boolean;
  category?: any;
  close: () => void;
  fetchCategory: () => void;
};
// ================================================================

const CategoryForm: FC<CategoryFormProps> = ({ open, close, fetchCategory, category }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Category Name is required"),
    icon: yup.string().required("Icon name is required"),
  });

  const initialValues = {
    icon: category?.icon || "",
    name: category?.name || "",
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingButton(true);

    try {
      const { name, icon } = values;

      if (!category) {
        // create new category
        const { data } = await axios.post("/api/category", { name, icon });
        // added create category in navlist
        await axios.put(`/api/category-navlist/${db_slug.category_nav}`, { category: data._id });
        toast.success("Category created successfully");
      } else {
        await axios.put(`/api/category/${category.slug}`, { name, icon });
        toast.success("Category updated successfully");
      }

      setLoadingButton(false);
      fetchCategory();
      close();
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>
        <H3>Add New Category</H3>
      </DialogTitle>

      <DialogContent sx={{ pt: "10px !important" }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="name"
                value={values.name}
                onBlur={handleBlur}
                label="Category Name"
                onChange={handleChange}
                error={!!touched.name && !!errors.name}
                helperText={(touched.name && errors.name) as string}
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
                {category ? "Update" : "Create"}
              </LoadingButton>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
