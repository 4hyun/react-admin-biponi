import { ReactElement } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Card, Grid } from "@mui/material";
import isToday from "date-fns/isToday";
// custom components
import Loading from "components/Loading";
import { H1, H5 } from "components/Typography";
import OrderRow from "components/orders/OrderRow";
import ProductRow from "components/products/ProductRow";
// custom hooks
import useOrders from "hooks/useOrders";
import useProducts from "hooks/useProducts";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";

const AdminDashboard: NextPageWithLayout = () => {
  const { orders, isLoading: orderLoading } = useOrders();
  const { products, isLoading: proLoading } = useProducts();

  // RECENT ORDER LIST
  const todaysOrders = orders.filter((order) => isToday(new Date(order.createdAt)));

  // STOCK OUT PRODUCT LIST
  const stockOutProducts = products.filter((product) => product.skus[0].quantity === 0);

  const cardList = [
    { title: "Total Products", amount: products.length },
    { title: "Total Orders", amount: orders.length },
    { title: "Today's Orders", amount: todaysOrders.length },
  ];

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (orderLoading || proLoading) return <Loading />;

  return (
    <Grid container spacing={3}>
      {cardList.map((item, ind) => (
        <Grid item lg={4} md={4} sm={6} xs={12} key={ind}>
          <Card sx={{ textAlign: "center", py: "1.5rem", height: "100%" }}>
            <H5 color="grey.600" mb={1}>
              {item.title}
            </H5>
            <H1 color="grey.700" mb={0.5} lineHeight="1.3">
              {item.amount}
            </H1>
          </Card>
        </Grid>
      ))}

      <Grid item xs={12}>
        <Card sx={{ p: "20px 30px" }}>
          <H5 mb={3}>Recent Orders</H5>
          {todaysOrders.map((item) => (
            <OrderRow item={item} key={item._id} orderDetailsRoute="/admin/orders" />
          ))}
        </Card>
      </Grid>

      {stockOutProducts.length > 0 && (
        <Grid item xs={12}>
          <Card sx={{ p: "20px 30px" }}>
            <H5 mb={3}>Stock Out Products</H5>
            {stockOutProducts.map((item) => (
              <ProductRow product={item} key={item._id} />
            ))}
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

// ==============================================================
AdminDashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader title="Dashboard" Icon={ShoppingBag} />
      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default AdminDashboard;
