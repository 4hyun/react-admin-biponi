import { useRouter } from "next/router";
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
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import DropZone from "components/DropZone";
import FlexBox from "components/flex-box/FlexBox";
import getHeaderLink from "components/getHeaderLink";
import DeliveryBox from "components/icons/DeliveryBox";
import UploadImageBox from "components/products/UploadImageBox";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// data type for typescript
import UploadImage from "__types__/uploadImage";
import { Category, Product } from "__types__/common";

// ==============================================================
type ProductImage = { key: string; location: string };
// ==============================================================

const ProductDetails: NextPageWithLayout = () => {
  const { query, push } = useRouter();
  const [files, setFiles] = useState<UploadImage[]>([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [deletedImage, setDeletedImage] = useState<any[]>([]);
  const [existingImage, setExistingImage] = useState<ProductImage[]>([]);

  // GET THE ALL PRODUCT CATEGORIES
  const { data: categories = [] } = useSWR<Category[]>("/api/category");

  // GET PRODUCT DETAILS
  const {
    data: product,
    isLoading,
    mutate,
  } = useSWR<Product>(`/api/products/${query.id}`, null, {
    onSuccess(data) {
      setExistingImage(data.skus[0].image);
    },
  });

  const initialValues = {
    name: product?.item || "",
    category: product?.categories || [],
    tags: product?.tags?.join(", ") || "",
    description: product?.description || "",
    stock: product?.skus[0]?.quantity || 0,
    price: product?.skus[0]?.price.base || 0,
    discount: product?.skus[0]?.price.discount || 0,
    unit: product?.skus[0]?.unit || "",
  };

  // FORM FIELD VALIDATE SCHEMA
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    category: yup.array().min(1).required("required"),
    stock: yup.number().required("required"),
    price: yup.number().required("required"),
  });

  // HANDLE FORM SUBMIT
  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingBtn(true);
    const tags = values.tags.split(", ");

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("unit", values.unit);
    formData.append("stock", String(values.stock));
    formData.append("price", String(values.price));
    formData.append("discount", String(values.discount));
    formData.append("description", values.description);
    formData.append("tags", JSON.stringify(tags));
    formData.append("categories", JSON.stringify(values.category));
    formData.append("deleteImages", JSON.stringify(deletedImage));
    // product images
    files.forEach((file) => formData.append("files", file));

    try {
      await axios.put(`/api/product-upload/${product?._id}`, formData);
      setLoadingBtn(false);
      toast.success("Product Update Successfully");
      mutate();
      push("/admin/products");
    } catch (error) {
      setLoadingBtn(false);
      toast.error(getErrorMessage(error));
    }
  };

  // HANDLE DELETE UPLOADED PRODUCT IMAGE
  const handleDeleteExistingImage = (image: ProductImage) => {
    setExistingImage((state) => state.filter((item) => item.key !== image.key));
    setDeletedImage((state) => [...state, { Key: image.key }]);
  };

  // HANDLE UPLOAD NEW PRODUCT IMAGE FILE
  const handleFileDelete = (file: File) => {
    setFiles((files) => files.filter((item) => item.name !== file.name));
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
                  name="name"
                  label="Name"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
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
                <DropZone
                  onChange={(files) => {
                    const uploadFiles = files.map((file) =>
                      Object.assign(file, { preview: URL.createObjectURL(file) })
                    );
                    setFiles(uploadFiles);
                  }}
                />

                <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {existingImage.map((image: any, i) => {
                    return (
                      <UploadImageBox
                        key={i}
                        image={image.location}
                        handleClear={() => handleDeleteExistingImage(image)}
                      />
                    );
                  })}

                  {files.map((file, index) => {
                    return (
                      <UploadImageBox
                        key={index}
                        image={file.preview}
                        handleClear={() => handleFileDelete(file)}
                      />
                    );
                  })}
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
                  value={values.price}
                  label="Regular Price"
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
                  aria-readonly
                  label="Sales Price"
                  value={values.price - (values.price * values.discount) / 100}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  name="discount"
                  label="Discount (%)"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.discount}
                  placeholder="Product Discount"
                  inputProps={{ max: 100 }}
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
                  loading={loadingBtn}
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
ProductDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Edit Product"
        Icon={DeliveryBox}
        button={getHeaderLink("/admin/products", "Back to Product List")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==================================================================

export default ProductDetails;
