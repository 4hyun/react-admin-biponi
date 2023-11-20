import { FC } from "react";
import Link from "next/link";
import { format } from "date-fns";
import East from "@mui/icons-material/East";
import { Chip, IconButton, Typography, Box } from "@mui/material";
import TableRow from "components/TableRow";
import { H5, Paragraph } from "components/Typography";
import { Order } from "__types__/common";

// ====================================================
type OrderRowProps = {
  item: Order;
  orderDetailsRoute?: string;
};
// ====================================================

const OrderRow: FC<OrderRowProps> = ({ item, orderDetailsRoute = "/orders" }) => {
  const getColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "secondary";
      case "Processing":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "error";
      default:
        return "";
    }
  };

  return (
    <Link href={`${orderDetailsRoute}/${item._id}`}>
      <TableRow
        sx={{
          my: "1rem",
          padding: "6px 18px",
          display: "grid",
          gridTemplateColumns: { sm: "1.5fr 2fr 2fr 2fr 1fr", xs: "1fr 1fr" },
        }}
      >
        <H5 m={0.75} textAlign="left">
          #{item._id.substring(0, 8)}
        </H5>

        <Box m={0.75} textAlign="center">
          <Chip
            size="small"
            label={item.status}
            sx={{
              fontSize: 12,
              p: "0.25rem 0.5rem",
              color: !!getColor(item.status) ? `${getColor(item.status)}.900` : "inherit",
              backgroundColor: !!getColor(item.status) ? `${getColor(item.status)}.100` : "none",
            }}
          />
        </Box>

        <Typography className="pre" m={0.75} textAlign={{ xs: "left", sm: "center" }}>
          {format(new Date(item.createdAt), "MMM dd, yyyy")}
        </Typography>

        <Paragraph m={0.75} textAlign="center">
          ${item.total.toFixed(2)}
        </Paragraph>

        <Paragraph
          color="grey.600"
          textAlign="center"
          sx={{ flex: "0 0 0 !important", display: { xs: "none", sm: "block" } }}
        >
          <IconButton>
            <East fontSize="small" color="inherit" />
          </IconButton>
        </Paragraph>
      </TableRow>
    </Link>
  );
};

export default OrderRow;
