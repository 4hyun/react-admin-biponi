import Image from "next/image";
import Router from "next/router";
import { ReactElement, useState } from "react";
import { Avatar, Box, Card, Divider, Grid, MenuItem, IconButton, TextField } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import toast from "react-hot-toast";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
// custom hook
import useProductSearch from "hooks/useProductSearch";
// custom components
import getHeaderLink from "components/getHeaderLink";
import { FlexItemCenter } from "components/flex-box";
import DeliveryBox from "components/icons/DeliveryBox";
import { H3, H6, Paragraph } from "components/Typography";
import { SearchResultCard } from "components/search-box/HomeSearchBox";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// product data type for typescript
import { Product } from "__types__/common";

const AddSlider: NextPageWithLayout = () => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingButton, setLoadingButton] = useState(false);
  const { search, resultList, notFoundResult } = useProductSearch();

  const initialValues = {
    name: "",
    heading: "",
    description: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required!"),
    heading: yup.string().required("Heading is required!"),
  });

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingButton(true);
    const { name, heading, description } = values;

    if (!products.length && products.length < 3) {
      alert("you should added minimum 3 products in list");
      setLoadingButton(false);
      return;
    }

    try {
      await axios.post("/api/product-type", { name, heading, products, description });
      toast.success("New products slider created");
      Router.push("/admin/slider");
      setLoadingButton(false);
    } catch (error) {
      setLoadingButton(false);
      toast.error(getErrorMessage(error));
    }
  };

  // added new item when click in search result
  const handlePushItem = (item: Product) => {
    setSearchValue("");
    const find = products.find((pro) => pro._id === item._id);
    if (!find) setProducts((state) => [...state, item]);
    search(null);
  };

  // search products for add in product list
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e);
    setSearchValue(e.target.value);
  };

  // remove a item from product list
  const handleDeleteProduct = (id: string) => {
    setProducts((state) => state.filter((item) => item._id !== id));
  };

  return (
    <Card sx={{ p: "30px" }}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Slider Name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Popular Products Slider"
                    error={!!touched.name && !!errors.name}
                    helperText={(touched.name && errors.name) as string}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    name="heading"
                    label="Heading"
                    onBlur={handleBlur}
                    value={values.heading}
                    onChange={handleChange}
                    placeholder="Popular Products"
                    error={!!touched.heading && !!errors.heading}
                    helperText={(touched.heading && errors.heading) as string}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Short Description"
                    value={values.description}
                    placeholder="Best collection in 2021 for you!"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <H3 mb={3}>Add New Product in List</H3>

                  <Box position="relative">
                    <TextField
                      fullWidth
                      name="search"
                      value={searchValue}
                      label="Search Product"
                      placeholder="Search..."
                      onChange={handleSearch}
                    />

                    {resultList.length > 0 && (
                      <SearchResultCard
                        elevation={2}
                        sx={{ position: resultList.length ? "relative" : "absolute" }}
                      >
                        {resultList.map((item) => (
                          <MenuItem key={item._id} onClick={() => handlePushItem(item)}>
                            <Box mr={1} width={30} height={30} position="relative">
                              <Image fill src={item.skus[0].image[0].location} alt={item.item} />
                            </Box>

                            {item.item}
                          </MenuItem>
                        ))}
                      </SearchResultCard>
                    )}

                    {notFoundResult && (
                      <SearchResultCard elevation={2}>
                        <Paragraph p={2}>Not Found Products</Paragraph>
                      </SearchResultCard>
                    )}
                  </Box>

                  {products.map((product) => (
                    <FlexItemCenter flexWrap="wrap" my={2} key={product._id}>
                      <FlexItemCenter flex="2 2 260px" gap={2}>
                        <Avatar
                          src={product.skus[0].image[0].location}
                          sx={{ height: 44, width: 44, borderRadius: "4px" }}
                        />
                        <H6>{product.item}</H6>
                      </FlexItemCenter>

                      <FlexItemCenter flex="0 0 0" m={0.75}>
                        <IconButton onClick={() => handleDeleteProduct(product._id)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </FlexItemCenter>
                    </FlexItemCenter>
                  ))}
                </Grid>

                <Grid item xs={12}>
                  <LoadingButton
                    type="submit"
                    color="primary"
                    variant="contained"
                    loading={loadingButton}
                  >
                    Create
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
AddSlider.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Slider List"
        Icon={DeliveryBox}
        button={getHeaderLink("/admin/slider", "Slider List")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default AddSlider;
