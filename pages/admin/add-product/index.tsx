import Router from "next/router";
import { ReactElement, useState } from "react";
import {
  Card,
  Grid,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";
// custom components
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/FlexBox";
import getHeaderLink from "components/getHeaderLink";
import DeliveryBox from "components/icons/DeliveryBox";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// data types for typescript
import { Category } from "__types__/common";
import UploadImage from "__types__/uploadImage";
import UploadImageBox from "components/products/UploadImageBox";

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  stock: yup.number().required("required"),
  price: yup.number().required("required"),
  category: yup.array().min(1).required("required"),
});

const AddNewProduct: NextPageWithLayout = () => {
  const [files, setFiles] = useState<UploadImage[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);

  // GET THE ALL PRODUCT CATEGORIES
  const { data: categories = [] } = useSWR<Category[]>("/api/category");

  const initialValues = {
    name: "",
    stock: "",
    price: "",
    discount: 0,
    description: "",
    tags: "",
    category: [],
    image: "",
    unit: "",
  };

  const handleFormSubmit = async (values: typeof initialValues) => {
    const tags = values.tags.split(", ");

    if (files.length === 0) return alert("Product Image is Required!");

    setLoadingButton(true);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("unit", values.unit);
    formData.append("stock", values.stock);
    formData.append("price", values.price);
    formData.append("discount", String(values.discount));
    formData.append("tags", JSON.stringify(tags));
    formData.append("description", values.description);
    formData.append("category", JSON.stringify(values.category));

    files.forEach((file) => formData.append("files", file));

    try {
      const { data } = await axios.post("/api/product-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`New Product Created ${data._id}`);
      Router.push("/admin/products");
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  const handleFileDelete = (file: File) => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
  };

  const handleDropzone = (files: File[]) => {
    const uploadFiles = files.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );

    setFiles(uploadFiles);
  };

  return (
    <Card sx={{ p: "30px" }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  placeholder="Name"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={(touched.name && errors.name) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl fullWidth size="small">
                  <InputLabel id="category">Select Category</InputLabel>
                  <Select
                    multiple
                    name="category"
                    labelId="category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    input={<OutlinedInput label="Select Category" />}
                    error={!!touched.category && !!errors.category}
                  >
                    {categories.map((item) => (
                      <MenuItem value={item.name} key={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <DropZone onChange={(files) => handleDropzone(files)} />

                <FormHelperText error={!!touched.image && !!errors.image}>
                  {(touched.image && errors.image) as string}
                </FormHelperText>

                <FlexBox flexDirection="row" flexWrap="wrap" mt={1} gap={1}>
                  {files.map((file, index) => (
                    <UploadImageBox
                      key={index}
                      image={file.preview}
                      handleClear={() => handleFileDelete(file)}
                    />
                  ))}
                </FlexBox>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  rows={6}
                  multiline
                  fullWidth
                  name="description"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Description"
                  value={values.description}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="stock"
                  label="Stock"
                  type="number"
                  placeholder="Stock"
                  onBlur={handleBlur}
                  value={values.stock}
                  onChange={handleChange}
                  error={!!touched.stock && !!errors.stock}
                  helperText={(touched.stock && errors.stock) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="tags"
                  label="Tags"
                  onBlur={handleBlur}
                  value={values.tags}
                  onChange={handleChange}
                  placeholder="Tag1, Tag2, Tag3"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="price"
                  type="number"
                  onBlur={handleBlur}
                  label="Regular Price"
                  value={values.price}
                  onChange={handleChange}
                  placeholder="Regular Price"
                  error={!!touched.price && !!errors.price}
                  helperText={(touched.price && errors.price) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  name="discount"
                  label="Discount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discount}
                  placeholder="Product Discount"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  name="unit"
                  label="Unit"
                  value={values.unit}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Product Unit"
                />
              </Grid>

              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={loadingButton}
                >
                  Save product
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Card>
  );
};

// ==================================================================
AddNewProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Add Product"
        Icon={DeliveryBox}
        button={getHeaderLink("/admin/products", "Back to Product List")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==================================================================

export default AddNewProduct;
