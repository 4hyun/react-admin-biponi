import Link from "next/link";
import { Fragment, ReactElement, useState } from "react";
import { IconButton, Pagination } from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import toast from "react-hot-toast";
import Edit from "@mui/icons-material/Edit";
import Place from "@mui/icons-material/Place";
import Delete from "@mui/icons-material/Delete";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { Paragraph } from "components/Typography";
import { FlexContentCenter } from "components/flex-box";
import ConfirmationAlert from "components/ConfirmationAlert";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "components/layouts/user-dashboard/Layout";
// utils function for get error message
import getErrorMessage from "utils/getErrorMessage";
// address data type for typescript
import { Address } from "__types__/common";

const AddressList: NextPageWithLayout = () => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [selectDeleteItem, setSelectDeleteItem] = useState<string | null>(null);

  const { data: address, error, mutate, isLoading } = useSWR<Address[]>("/api/address");

  const handleCloseDeleteAlert = () => {
    setDeleteAlert(false);
    setSelectDeleteItem(null);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/address/${selectDeleteItem}`);
      toast.success(`${data._id} Deleted Successfully`);
      handleCloseDeleteAlert();
      mutate();
    } catch (error) {
      toast.error(getErrorMessage(error));
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
        handleConfirm={handleDelete}
        close={handleCloseDeleteAlert}
        description="want to remove this address."
      />

      {address && address.length > 0 && (
        <Fragment>
          {address.map((item) => (
            <TableRow
              key={item._id}
              sx={{
                my: 2,
                gap: 2,
                display: "grid",
                padding: "6px 18px",
                gridTemplateColumns: { sm: "1fr 3fr 1fr 1fr", xs: "repeat(2, 1fr)" },
              }}
            >
              <Paragraph whiteSpace="pre">{item.name}</Paragraph>

              <Paragraph>{`${item.street1}, ${item.city}, ${item.zip}, ${item.country}`}</Paragraph>

              <Paragraph whiteSpace="pre" textAlign={{ sm: "center", xs: "left" }}>
                {item.phone}
              </Paragraph>

              <Paragraph whiteSpace="pre" textAlign="center" color="grey.600">
                <IconButton LinkComponent={Link} href={`/address/${item._id}`}>
                  <Edit fontSize="small" color="inherit" />
                </IconButton>

                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteAlert(true);
                    setSelectDeleteItem(item._id as string);
                  }}
                >
                  <Delete fontSize="small" color="inherit" />
                </IconButton>
              </Paragraph>
            </TableRow>
          ))}

          <FlexContentCenter mt={5}>
            <Pagination
              count={Math.ceil(address.length / 5)}
              onChange={(_, value) => console.log(value)}
            />
          </FlexContentCenter>
        </Fragment>
      )}
    </Fragment>
  );
};

// =================================================================
AddressList.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserDashboardLayout>
      <DashboardPageHeader Icon={Place} title="My Addresses" />
      {page}
    </UserDashboardLayout>
  );
};
// =================================================================

export default AddressList;
