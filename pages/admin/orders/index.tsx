import { Fragment, ReactElement, useState } from "react";
import Pagination from "@mui/material/Pagination";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import OrderRow from "components/orders/OrderRow";
import { FlexContentCenter } from "components/flex-box";
// custom hook
import useOrders from "hooks/useOrders";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for pagination
import pagination from "__server__/utils/pagination";

const Orders: NextPageWithLayout = () => {
  const { orders, isLoading } = useOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const currentOrders = pagination(currentPage, orders);

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <TableRow
        elevation={0}
        sx={{
          background: "none",
          padding: "0px 18px",
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: { sm: "1.5fr 2fr 2fr 2fr 1fr", xs: "1fr 1fr" },
        }}
      >
        <H5 color="grey.600" mx={0.75} textAlign="left">
          Order #
        </H5>

        <H5 color="grey.600" mx={0.75} textAlign="center">
          Status
        </H5>

        <H5 color="grey.600" mx={0.75} textAlign="center">
          Date purchased
        </H5>

        <H5 color="grey.600" mx={0.75} textAlign="center">
          Total
        </H5>
      </TableRow>

      {currentOrders.map((item) => (
        <OrderRow item={item} key={item._id} orderDetailsRoute="/admin/orders" />
      ))}

      <FlexContentCenter mt={5}>
        <Pagination
          color="primary"
          variant="outlined"
          count={Math.ceil(orders.length / 10)}
          onChange={(_, value) => setCurrentPage(value)}
        />
      </FlexContentCenter>
    </Fragment>
  );
};

// ==============================================================
Orders.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader title="Orders" Icon={ShoppingBag} />
      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default Orders;
