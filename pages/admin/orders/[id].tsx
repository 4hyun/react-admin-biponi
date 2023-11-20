import { useRouter } from "next/router";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { Avatar, Box, Card, Divider, Grid, MenuItem, IconButton, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Delete from "@mui/icons-material/Delete";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import format from "date-fns/format";
import toast from "react-hot-toast";
import useSWR from "swr";
import axios from "axios";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import getHeaderLink from "components/getHeaderLink";
import { H5, H6, Paragraph } from "components/Typography";
import { FlexBetween, FlexItemCenter } from "components/flex-box";
import { SearchResultCard } from "components/search-box/HomeSearchBox";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// custom hook
import useProductSearch from "hooks/useProductSearch";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// constant data
import { orderStatusList } from "utils/constants";
// data type for typescript
import { Order, OrderItems, Product } from "__types__/common";

const OrderDetails: NextPageWithLayout = () => {
  const { query, push } = useRouter();
  const [order, setOrder] = useState<Order>();
  const [orderStatus, setOrderStatus] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const { notFoundResult, search, resultList } = useProductSearch();

  const { isLoading } = useSWR<Order>(`/api/orders/${query.id}`, null, {
    onSuccess: (data) => setOrder(data),
  });

  const handleSubmit = async () => {
    setLoadingButton(true);
    const { _id } = order || {};

    if (!_id) {
      alert("ID Not Exists!");
      return;
    }

    try {
      if (orderStatus === "Delivered") {
        await axios.put(`/api/orders/${_id}`, {
          ...order,
          status: orderStatus,
          isDelivered: true,
          deliveredAt: Date.now(),
        });
      } else {
        await axios.put(`/api/orders/${_id}`, { ...order, status: orderStatus });
      }

      toast.success(`Order Updated Successfully`);
      push("/admin/orders");
      setLoadingButton(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  // calculate order total price
  const reCalculate = (items: OrderItems[]) => {
    const preTaxTotal = items.reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
    const total = preTaxTotal + (order ? order.tax : 0);
    setOrder((state: any) => ({ ...state, items, preTaxTotal, total }));
  };

  // change the quantity for a item
  const handleQuantityChange = (qty: number, productId: string) => {
    if (order) {
      const items = order.items.map((item) => {
        return item.productId === productId ? { ...item, quantity: qty } : item;
      });

      reCalculate(items);
    }
  };

  // delete item from order
  const deleteOrderItem = (productId: string) => {
    if (order) {
      const items = order.items.filter((item) => item.productId !== productId);
      reCalculate(items);
    }
  };

  // add new item in order
  const addOrderItem = (product: Product) => {
    const priceObj = product.skus[0].price;
    const price = priceObj.base - (priceObj.base * priceObj.discount) / 100;

    const item = {
      price,
      quantity: 1,
      name: product.item,
      productId: product._id,
      img: product.skus[0]?.image[0]?.location,
    };

    const items = order ? [...order.items, item] : [item];
    reCalculate(items);

    setSearchProduct("");
    search(null);
  };

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <Card sx={{ p: 0, mb: "30px" }}>
        <TableRow
          elevation={0}
          sx={{ bgcolor: "grey.200", p: "12px", borderRadius: "0px !important" }}
        >
          <FlexItemCenter flex="0 0 0 !important" m={0.75} whiteSpace="pre">
            <Paragraph color="grey.600" mr={0.5}>
              Order ID:
            </Paragraph>

            <Paragraph fontSize="14px">{order?._id}</Paragraph>
          </FlexItemCenter>

          <FlexItemCenter className="pre" m={0.75}>
            <Paragraph color="grey.600" mr={0.5}>
              Placed on:
            </Paragraph>

            {order?.createdAt && (
              <Paragraph>{format(new Date(order.createdAt), "dd MMM, yyyy")}</Paragraph>
            )}
          </FlexItemCenter>

          <Box maxWidth="160px">
            <TextField
              select
              fullWidth
              value={orderStatus}
              label="Order Status"
              placeholder="Order Status"
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              {orderStatusList.map((item) => (
                <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </TableRow>

        <Box p="1rem 1.5rem 10px" position="relative">
          <TextField
            fullWidth
            label="Add Product"
            value={searchProduct}
            onChange={(e) => {
              search(e);
              setSearchProduct(e.target.value);
            }}
          />

          {resultList.length > 0 && (
            <SearchResultCard elevation={2}>
              {resultList.map((item) => (
                <MenuItem key={item._id} onClick={() => addOrderItem(item)}>
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

        <Box py={1}>
          {order?.items.map((item, index) => (
            <FlexItemCenter px={2} py={1} flexWrap="wrap" key={index}>
              <FlexItemCenter flex={1} gap={2}>
                <Avatar src={item.img} sx={{ height: 64, width: 64 }} />

                <Box>
                  <H6 my="0px">{item.name}</H6>

                  <FlexItemCenter gap={1}>
                    <Paragraph color="grey.600">${item.price} x</Paragraph>

                    <Box maxWidth="60px" mt={0.5}>
                      <TextField
                        fullWidth
                        type="number"
                        defaultValue={item.quantity}
                        InputProps={{ inputProps: { min: "1" } }}
                        onChange={(e) => handleQuantityChange(+e.target.value, item.productId)}
                      />
                    </Box>
                  </FlexItemCenter>
                </Box>
              </FlexItemCenter>

              <IconButton onClick={() => deleteOrderItem(item.productId)}>
                <Delete fontSize="small" />
              </IconButton>
            </FlexItemCenter>
          ))}
        </Box>
      </Card>

      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{ p: "20px 30px", mb: "1.5rem" }}>
            <H5 mt={0} mb={2}>
              Shipping Address
            </H5>

            <H6>Name: {order?.shipping.name}</H6>
            <Paragraph>Email: {order?.shipping.email}</Paragraph>
            <Paragraph>Phone: {order?.shipping.phone}</Paragraph>
            <Paragraph>
              Address:{" "}
              {`${order?.shipping.address}, ${order?.shipping.city}, ${order?.shipping.postalCode}, ${order?.shipping.country}`}
            </Paragraph>
          </Card>

          <LoadingButton
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            loading={loadingButton}
            // sx={{ display: "block" }}
          >
            Save Order
          </LoadingButton>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{ p: "20px 30px", mb: "1.5rem" }}>
            <H5 mt={0} mb={2}>
              Total Summary
            </H5>

            <FlexBetween mb={1}>
              <Paragraph color="grey.600">Subtotal:</Paragraph>
              <H6 my="0px">${order?.preTaxTotal.toFixed(2)}</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Paragraph color="grey.600">Shipping fee:</Paragraph>
              <H6 my="0px">${0}</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Paragraph color="grey.600">Discount:</Paragraph>
              <H6 my="0px">${order?.discount}</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Paragraph color="grey.600">Tax:</Paragraph>
              <H6 my="0px">${order?.tax.toFixed(2)}</H6>
            </FlexBetween>

            <Divider sx={{ mb: "0.5rem" }} />

            <FlexBetween mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">${order?.total.toFixed(2)}</H6>
            </FlexBetween>

            {order?.paymentType === "cash" && (
              <Paragraph fontSize="14px">Cash On Delivery Payment</Paragraph>
            )}

            {order?.paymentStatus && order.paymentType === "card" && (
              <Paragraph>Paid by {order.paymentId.card.brand.toUpperCase()} Card</Paragraph>
            )}
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

// ==================================================================
OrderDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        Icon={ShoppingBag}
        title="Order Details"
        button={getHeaderLink("/admin/orders", "Back to Order List")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==================================================================

export default OrderDetails;
