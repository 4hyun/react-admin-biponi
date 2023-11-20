import Router from "next/router";
import { Fragment, ReactElement, useState } from "react";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import toast from "react-hot-toast";
import axios from "axios";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import FlexBox from "components/flex-box/FlexBox";
import getHeaderLink from "components/getHeaderLink";
import DeliveryBox from "components/icons/DeliveryBox";
import ConfirmationAlert from "components/ConfirmationAlert";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout
import { NextPageWithLayout } from "../../_app";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// slider data type for typescript
import { SliderProductType } from "__types__/common";

const Slider: NextPageWithLayout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteSlider, setDeleteSlider] = useState("");

  const {
    data: sliders = [],
    mutate,
    isLoading,
  } = useSWR<SliderProductType[]>("/api/product-type");

  // HANDLE DELETE SLIDER FROM DATABASE
  const handleDeleteSlider = async () => {
    try {
      await axios.delete(`/api/product-type/${deleteSlider}`);
      toast.success("Slider deleted successfully");
      setDialogOpen(false);
      setDeleteSlider("");
      mutate();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // HANDLE CONFIRMATION ALERT CLOSE
  const handleAlertClose = () => {
    setDeleteSlider("");
    setDialogOpen(false);
  };

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <ConfirmationAlert
        open={dialogOpen}
        close={handleAlertClose}
        handleConfirm={handleDeleteSlider}
        description="Want to remove this slider."
      />

      {sliders.map((item) => (
        <TableRow
          key={item._id}
          onClick={() => Router.push(`/admin/slider/${item.slug}`)}
          sx={{ my: "1rem", padding: "6px 18px" }}
        >
          <H5 m={0.75} textAlign="left" fontWeight="600">
            {item.name}
          </H5>

          <H5 m={0.75} textAlign="center" fontWeight="400">
            {item.heading}
          </H5>

          <FlexBox justifyContent="end">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                Router.push(`/admin/slider/${item.slug}`);
              }}
            >
              <RemoveRedEye fontSize="small" color="inherit" />
            </IconButton>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setDialogOpen(true);
                setDeleteSlider(item.slug);
              }}
            >
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </FlexBox>
        </TableRow>
      ))}
    </Fragment>
  );
};

// ==============================================================
Slider.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Slider List"
        Icon={DeliveryBox}
        button={getHeaderLink("/admin/slider/add-slider", "Add New Slider")}
      />
      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default Slider;
