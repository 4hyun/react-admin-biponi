import Image from "next/image";
import { Fragment, ReactElement, useState } from "react";
import { Card, IconButton, Pagination } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Delete from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import axios from "axios";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import getHeaderLink from "components/getHeaderLink";
import { H5, Paragraph } from "components/Typography";
import ConfirmationAlert from "components/ConfirmationAlert";
import DashboardPageHeader from "components/DashboardPageHeader";
import { FlexContentCenter, FlexItemCenter } from "components/flex-box";
// layout
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "components/layouts/user-dashboard/Layout";
// utils function for get error message
import getErrorMessage from "utils/getErrorMessage";
// card data type for typescript
import { CreditCard } from "__types__/common";

const PaymentMethods: NextPageWithLayout = () => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [selectDeleteItem, setSelectDeleteItem] = useState<string | null>(null);

  const { data: cards = [], error, mutate, isLoading } = useSWR<CreditCard[]>("/api/stripe/card");

  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
    setSelectDeleteItem(null);
  };

  const deleteCard = async () => {
    try {
      await axios.delete(`/api/stripe/card?cardId=${selectDeleteItem}`);
      handleCloseDeleteAlert();
      mutate();
    } catch (error) {
      toast.error(getErrorMessage(error));
      handleCloseDeleteAlert();
    }
  };

  // SHOW LOADING INDICATOR
  if (isLoading) return <Loading height={200} />;

  // ERROR HANDLING
  if (error) return <Paragraph>Something Error Occurred!</Paragraph>;

  return (
    <Fragment>
      <ConfirmationAlert
        open={deleteAlert}
        handleConfirm={deleteCard}
        close={handleCloseDeleteAlert}
        description="want to remove this card."
      />

      {cards.map((item, ind) => (
        <TableRow
          key={ind}
          sx={{
            gap: 2,
            my: "1rem",
            display: "grid",
            padding: "6px 18px",
            gridTemplateColumns: { sm: "2fr 2fr 1fr 1fr", xs: "repeat(2, 1fr)" },
          }}
        >
          <FlexItemCenter m={0.75}>
            <Card sx={{ width: 42, height: 28, mr: "10px", borderRadius: 2, position: "relative" }}>
              <Image
                fill
                alt={item.cardType}
                src={`/assets/images/payment-methods/${item.cardType}.svg`}
              />
            </Card>

            <H5 ellipsis m={0.75}>
              {item.name}
            </H5>
          </FlexItemCenter>

          <Paragraph ellipsis m={0.75}>
            **** **** **** {item.cardLast4}
          </Paragraph>

          <Paragraph ellipsis m={0.75}>
            {item.cardExpMonth} / {item.cardExpYear}
          </Paragraph>

          <Paragraph ellipsis textAlign="center" color="grey.600">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setDeleteAlert(true);
                setSelectDeleteItem(item.cardId);
              }}
            >
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </Paragraph>
        </TableRow>
      ))}

      <FlexContentCenter mt={5}>
        <Pagination count={Math.ceil(cards.length / 5)} onChange={(data) => console.log(data)} />
      </FlexContentCenter>
    </Fragment>
  );
};

// =================================================================
PaymentMethods.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserDashboardLayout>
      <DashboardPageHeader
        Icon={CreditCardIcon}
        title="Payment Methods"
        button={getHeaderLink("/payment-methods/add", "Add New Payment Method")}
      />
      {page}
    </UserDashboardLayout>
  );
};
// =================================================================

export default PaymentMethods;
