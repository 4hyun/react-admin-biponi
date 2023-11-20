import { useRouter } from "next/router";
import { Fragment, ReactElement, useState } from "react";
import { Avatar, Box, IconButton, Pagination, TextField } from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import axios from "axios";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import getHeaderLink from "components/getHeaderLink";
import { H5, Paragraph } from "components/Typography";
import DeliveryBox from "components/icons/DeliveryBox";
import ConfirmationAlert from "components/ConfirmationAlert";
import { FlexContentCenter, FlexItemCenter, FlexBox } from "components/flex-box";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// custom hook
import useProducts from "hooks/useProducts";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// utils function for pagination
import pagination from "__server__/utils/pagination";

const Products: NextPageWithLayout = () => {
  const { push } = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // GET ALL PRODUCTS FROM SERVER
  const { products, isLoading, mutate } = useProducts();

  // FILTER PRODUCT WITH USER SEARCHING VALUE
  const filteredProducts = products.filter((product) =>
    product.item.toLowerCase().includes(searchValue.toLowerCase())
  );

  // PER PAGE PRODUCT LIST
  const currentProducts = pagination(currentPage, filteredProducts);

  // HANDLE CONFIRMATION MODAL CLOSE
  const dialogClose = () => {
    setDeleteId("");
    setDialogOpen(false);
  };

  // HANDLE DELETE PRODUCT FROM PRODUCT LIST
  const handleDeleteProduct = async () => {
    if (deleteId) {
      try {
        await axios.delete(`/api/products/${deleteId}`);
        mutate();
        setDeleteId("");
        setDialogOpen(false);
        toast.success("Product deleted Successfully");
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  const paginationCount = searchValue
    ? Math.ceil(currentProducts.length / 10)
    : Math.ceil(products.length / 10);

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <TextField
        fullWidth
        placeholder="Search Product..."
        onChange={(e) => setSearchValue(e.target.value)}
        sx={{ mb: 2, maxWidth: { md: "40%", xs: "100%" } }}
      />

      <TableRow
        elevation={0}
        sx={{
          mb: "-0.125rem",
          padding: "0px 18px",
          bgcolor: "transparent",
          display: { xs: "none", md: "flex" },
        }}
      >
        <FlexBox my={0} mx={0.75} flex="2 2 220px !important">
          <H5 ml={7} color="grey.600" textAlign="left">
            Name
          </H5>
        </FlexBox>

        <H5 color="grey.600" my="0px" mx={0.75} textAlign="left">
          Stock
        </H5>

        <H5 color="grey.600" my="0px" mx={0.75} textAlign="left">
          Regular price
        </H5>

        <H5 color="grey.600" my="0px" mx={0.75} textAlign="left">
          Sale Price
        </H5>

        <H5 flex="0 0 0 !important" color="grey.600" px={2.75} my="0px" />
      </TableRow>

      {currentProducts.map((product) => {
        const { _id, item, skus } = product;

        const basePrice = skus[0].price.base;
        const salePrice = basePrice - (basePrice * skus[0].price.discount) / 100;

        return (
          <TableRow
            key={_id}
            onClick={() => push(`/admin/products/${_id}`)}
            sx={{ my: "1rem", padding: "6px 18px" }}
          >
            <FlexItemCenter gap={2.5} m={0.75} flex="2 2 220px !important">
              <Avatar src={skus[0].image[0]?.location} sx={{ height: 36, width: 36 }} />
              <Paragraph textAlign="left">{item}</Paragraph>
            </FlexItemCenter>

            <H5
              m={0.75}
              textAlign="left"
              fontWeight="600"
              color={skus[0].quantity < 6 ? "error.main" : "inherit"}
            >
              {skus[0].quantity.toString().padStart(2, "0")}
            </H5>

            <H5 m={0.75} textAlign="left" fontWeight="400">
              ${basePrice.toFixed(2)}
            </H5>

            <H5 m={0.75} textAlign="left" fontWeight="400">
              ${salePrice.toFixed(2)}
            </H5>

            <Box
              color="grey.600"
              textAlign="center"
              sx={{ flex: "0 0 0 !important", display: { xs: "none", md: "flex" } }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setDialogOpen(true);
                  setDeleteId(_id);
                }}
              >
                <Delete fontSize="small" color="inherit" />
              </IconButton>
            </Box>
          </TableRow>
        );
      })}

      <ConfirmationAlert
        open={dialogOpen}
        close={dialogClose}
        handleConfirm={handleDeleteProduct}
        description="Want to remove this product."
      />

      <FlexContentCenter mt={5}>
        <Pagination count={paginationCount} onChange={(_, value) => setCurrentPage(value)} />
      </FlexContentCenter>
    </Fragment>
  );
};

// ==================================================================
Products.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Products"
        Icon={DeliveryBox}
        button={getHeaderLink("/admin/add-product", "Add Product")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==================================================================

export default Products;
