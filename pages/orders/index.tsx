import { Fragment, ReactElement, useState } from "react";
import { Box, Pagination } from "@mui/material";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5, Paragraph } from "components/Typography";
import LazyImage from "components/LazyImage";
import NavLink from "components/nav-link/NavLink";
import OrderRow from "components/orders/OrderRow";
import DashboardPageHeader from "components/DashboardPageHeader";
import { FlexCenter, FlexContentCenter } from "components/flex-box";
// layout
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "components/layouts/user-dashboard/Layout";
// utils function for pagination
import pagination from "__server__/utils/pagination";

const Orders: NextPageWithLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: orders = [], error, isLoading } = useSWR("/api/orders/user");

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading height={200} />;

  // SHOW ERROR MESSAGE WHEN A ERROR OCCUR
  if (error) return <Paragraph>Something Error Occurred!</Paragraph>;

  // SHOW EMPTY ORDER STATUS COMPONENT
  if (!isLoading && orders.length === 0) {
    return (
      <FlexCenter flexDirection="column" mt={8}>
        <LazyImage
          width={70}
          height={100}
          alt="shopping-bag"
          src="/assets/images/logos/shopping-bag.svg"
        />

        <Box component="p" mt={1} color="grey.600" textAlign="center">
          Your orders is empty.{" "}
          <NavLink href="/" style={{ textDecoration: "underline", color: "#D23F57" }}>
            Start Shopping
          </NavLink>
        </Box>
      </FlexCenter>
    );
  }

  // WHEN DATA IS AVAILABLE THEN RENDER IT
  if (orders && orders.length > 0) {
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
          {["Order #", "Status", "Date purchased", "Total"].map((item, i) => (
            <H5 key={i} color="grey.600" mx={0.75} textAlign={i === 0 ? "left" : "center"}>
              {item}
            </H5>
          ))}
        </TableRow>

        {pagination(currentPage, orders).map((item) => (
          <OrderRow item={item} key={item._id} />
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
  }

  return null;
};

// =================================================================
Orders.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserDashboardLayout>
      <DashboardPageHeader title="My Orders" Icon={ShoppingBag} />
      {page}
    </UserDashboardLayout>
  );
};
// =================================================================

export default Orders;
