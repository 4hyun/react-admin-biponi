import { useRouter } from "next/router";
import { Fragment, ReactElement } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Avatar, Box, Card, Divider, Grid } from "@mui/material";
// import { toast } from "react-hot-toast";
import format from "date-fns/format";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5, H6, Paragraph } from "components/Typography";
import DashboardPageHeader from "components/DashboardPageHeader";
import { FlexBetween, FlexItemCenter } from "components/flex-box";
// layouts
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "components/layouts/user-dashboard/Layout";
// // utils function for show error message
// import getErrorMessage from "utils/getErrorMessage";
// order data type for typescript
import { Order } from "__types__/common";

const OrderDetails: NextPageWithLayout = () => {
  const { query } = useRouter();
  const { data: order, error, isLoading } = useSWR<Order>(`/api/orders/${query.id}`);

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading />;

  // SHOW ERROR MESSAGE WHEN A ERROR OCCUR
  if (error) return <Paragraph>Something Error Occurred!</Paragraph>;

  // SHOW COMPONENT DATA WHEN ALL DATA IS EXIST
  if (order) {
    const products = order.items.map((item) => ({
      id: item._id,
      image: item.img,
      title: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const { address, name, email, phone, country, postalCode, city } = order.shipping || {};

    return (
      <Fragment>
        <Card sx={{ p: 0, mb: "30px" }}>
          <TableRow sx={{ p: "12px", borderRadius: 0, boxShadow: "none", bgcolor: "grey.200" }}>
            <FlexItemCenter gap={0.5} className="pre" m={0.75}>
              <Paragraph color="grey.600">Order ID:</Paragraph>
              <Paragraph>{order._id}</Paragraph>
            </FlexItemCenter>

            <FlexItemCenter gap={0.5} className="pre" m={0.75}>
              <Paragraph color="grey.600">Placed on:</Paragraph>
              <Paragraph>{format(new Date(order.createdAt), "dd MMM, yyyy")}</Paragraph>
            </FlexItemCenter>

            {order.deliveredAt && (
              <FlexItemCenter gap={0.5} className="pre" m={0.75}>
                <Paragraph color="grey.600">Delivered on:</Paragraph>
                <Paragraph>{format(new Date(order.deliveredAt), "dd MMM, yyyy")}</Paragraph>
              </FlexItemCenter>
            )}
          </TableRow>

          <Box py={1}>
            {products.map((item) => (
              <FlexItemCenter m={0.85} gap={1} key={item.id}>
                <Avatar src={item.image} sx={{ height: 64, width: 64 }} />

                <Box>
                  <H6 my="0px">{item.title}</H6>
                  <Paragraph color="grey.600">
                    ${item.price} x {item.quantity}
                  </Paragraph>
                </Box>
              </FlexItemCenter>
            ))}
          </Box>
        </Card>

        <Grid container spacing={3}>
          <Grid item lg={6} md={6} xs={12}>
            <Card sx={{ p: "20px 30px" }}>
              <H5 mt={0} mb={2}>
                Shipping Address
              </H5>

              <H6>Name: {name}</H6>
              <Paragraph>Email: {email}</Paragraph>
              <Paragraph>Phone: {phone}</Paragraph>
              <Paragraph>Address: {`${address}, ${city}, ${postalCode}, ${country}`}</Paragraph>
            </Card>
          </Grid>

          <Grid item lg={6} md={6} xs={12}>
            <Card sx={{ p: "20px 30px" }}>
              <H5 mt={0} mb={2}>
                Total Summary
              </H5>

              <FlexBetween mb={1}>
                <Paragraph color="grey.600">Subtotal:</Paragraph>
                <H6 my={0}>${order.preTaxTotal.toFixed(2)}</H6>
              </FlexBetween>

              <FlexBetween mb={1}>
                <Paragraph color="grey.600">Shipping fee:</Paragraph>
                <H6 my={0}>$0.00</H6>
              </FlexBetween>

              {order.discount > 0 && (
                <FlexBetween mb={1}>
                  <Paragraph color="grey.600">Discount:</Paragraph>
                  <H6 my={0}>-${order.discount}</H6>
                </FlexBetween>
              )}

              {order.tax > 0 && (
                <FlexBetween mb={1}>
                  <Paragraph color="grey.600">Tax:</Paragraph>
                  <H6 my={0}>${order.tax.toFixed(2)}</H6>
                </FlexBetween>
              )}

              <Divider sx={{ mb: 1 }} />

              <FlexBetween mb={2}>
                <H6 my={0}>Total</H6>
                <H6 my={0}>${order.total.toFixed(2)}</H6>
              </FlexBetween>

              {order.paymentType === "cash" && <Paragraph>Cash On Delivery Payment</Paragraph>}

              {order.paymentStatus && order.paymentType === "card" && (
                <Paragraph>Paid by {order.paymentId.card.brand.toUpperCase()} Card</Paragraph>
              )}
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }

  return null;
};

// =================================================================
OrderDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserDashboardLayout>
      <DashboardPageHeader Icon={ShoppingBag} title="Order Details" />
      {page}
    </UserDashboardLayout>
  );
};
// =================================================================

export default OrderDetails;
