import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Pagination } from "@mui/material";
import axios from "axios";
import FlexBox from "components/flex-box/FlexBox";
import DashboardPageHeader from "components/DashboardPageHeader";
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import { FC, Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import pagination from "__server__/utils/pagination";
import OrderRow from "./OrderRow";
import getErrorMessage from "utils/getErrorMessage";

const CustomerOrderList: FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/user");
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const currentOrders = pagination(currentPage, orders);

  return (
    <Fragment>
      <DashboardPageHeader title="My Orders" Icon={ShoppingBag} />

      {loading && <Loading />}

      {!loading && (
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
            <OrderRow item={item} key={item._id} />
          ))}

          <FlexBox justifyContent="center" mt={5}>
            <Pagination
              color="primary"
              variant="outlined"
              count={Math.ceil(orders.length / 10)}
              onChange={(_, value) => setCurrentPage(value)}
            />
          </FlexBox>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CustomerOrderList;
