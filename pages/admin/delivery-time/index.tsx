import { Fragment, ReactElement, useState } from "react";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { Button, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import FlexBox from "components/flex-box/FlexBox";
import ConfirmationAlert from "components/ConfirmationAlert";
import DashboardPageHeader from "components/DashboardPageHeader";
import DeliveryTimeForm from "components/delivery-time/DeliveryTimeForm";
// layout
import { NextPageWithLayout } from "../../_app";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// delivery time data type for typescript
import DeliveryTime from "__types__/deliveryTime";

const DeliveryTimes: NextPageWithLayout = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editTime, setEditTime] = useState<DeliveryTime>();
  const [deleteItemSlug, setDeleteItemSlug] = useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const { data: times = [], isLoading, mutate } = useSWR<DeliveryTime[]>("/api/delivery-time");

  // handle close form for edit or add item
  const handleCloseForm = () => {
    setOpenForm(false);
    setEditTime(undefined);
  };

  // handle open form for edit or add item
  const handleOpenForm = () => setOpenForm(true);

  // handle delete delivery time from list
  const handleDeleteTime = async () => {
    try {
      if (deleteItemSlug) {
        await axios.delete(`/api/delivery-time/${deleteItemSlug}`);
        handleDeleteAlertClose();
        mutate();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // close the confirmation delete alert
  const handleDeleteAlertClose = () => {
    setOpenDeleteAlert(false);
    setDeleteItemSlug("");
  };

  // header title link
  const HEADER_LINK = (
    <Button color="primary" sx={{ bgcolor: "primary.light", px: 4 }} onClick={handleOpenForm}>
      Add Time
    </Button>
  );

  return (
    <>
      <DashboardPageHeader title="Delivery Times" Icon={ShoppingBag} button={HEADER_LINK} />

      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <DeliveryTimeForm
            open={openForm}
            time={editTime}
            fetchTimes={mutate}
            close={handleCloseForm}
          />

          <ConfirmationAlert
            open={openDeleteAlert}
            close={handleDeleteAlertClose}
            handleConfirm={handleDeleteTime}
            description="Want to remove this delivery time."
          />

          {times.map((item, ind) => (
            <TableRow
              key={item._id}
              sx={{
                my: 2,
                display: "grid",
                padding: "6px 18px",
                gridTemplateColumns: "1fr 2fr 2fr 1fr",
              }}
            >
              <H5 m={0.75} textAlign="left" fontWeight="600">
                {ind + 1}
              </H5>

              <H5 m={0.75} textAlign="center" fontWeight="600">
                {item.time}
              </H5>

              <H5 m={0.75} textAlign="center" fontWeight="400">
                {item.slug}
              </H5>

              <FlexBox justifyContent="right">
                <IconButton
                  onClick={() => {
                    setEditTime(item);
                    setOpenForm(true);
                  }}
                >
                  <RemoveRedEye fontSize="small" color="inherit" />
                </IconButton>

                <IconButton
                  onClick={() => {
                    setDeleteItemSlug(item.slug);
                    setOpenDeleteAlert(true);
                  }}
                >
                  <Delete fontSize="small" color="inherit" />
                </IconButton>
              </FlexBox>
            </TableRow>
          ))}
        </Fragment>
      )}
    </>
  );
};

// ==============================================================
DeliveryTimes.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
// ==============================================================

export default DeliveryTimes;
