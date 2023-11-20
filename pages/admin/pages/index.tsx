import Router from "next/router";
import { Fragment, ReactElement, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Delete, RemoveRedEye } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import axios from "axios";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import getHeaderLink from "components/getHeaderLink";
import DeliveryBox from "components/icons/DeliveryBox";
import FlexCenter from "components/flex-box/FlexCenter";
import ConfirmationAlert from "components/ConfirmationAlert";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout
import { NextPageWithLayout } from "../../_app";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";

const Pages: NextPageWithLayout = () => {
  const [deletePage, setDeletePage] = useState(null);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const { data: pages = [], isLoading, mutate } = useSWR<any[]>("/api/pages");

  // HANDLE DELETE PAGE
  const handlePageDelete = async () => {
    try {
      await axios.delete(`/api/pages/${deletePage}`);
      toast.success("Page deleted successfully");
      setDeleteAlert(false);
      setDeletePage(null);
      mutate();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  // HANDLE CONFIRM ALERT CLOSE
  const handleAlertClose = () => {
    setDeletePage(null);
    setDeleteAlert(false);
  };

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <ConfirmationAlert
        open={deleteAlert}
        close={handleAlertClose}
        handleConfirm={handlePageDelete}
        description="Want to remove this page."
      />

      {pages.map((page, ind) => {
        const { slug, name, _id } = page;
        return (
          <TableRow
            key={_id}
            onClick={() => Router.push(`/admin/pages/${slug}`)}
            sx={{ my: "1rem", padding: "6px 18px" }}
          >
            <H5 m={0.75} textAlign="left" fontWeight="600">
              {ind + 1}
            </H5>

            <H5 m={0.75} textAlign="left" fontWeight="600">
              {name}
            </H5>

            <H5 m={0.75} textAlign="left" fontWeight="400">
              {slug}
            </H5>

            <FlexCenter>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  Router.push(`/pages/${slug}`);
                }}
              >
                <RemoveRedEye fontSize="small" color="inherit" />
              </IconButton>

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteAlert(true);
                  setDeletePage(slug);
                }}
              >
                <Delete fontSize="small" color="inherit" />
              </IconButton>
            </FlexCenter>
          </TableRow>
        );
      })}
    </Fragment>
  );
};

// ==============================================================
Pages.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Pages"
        Icon={DeliveryBox}
        button={getHeaderLink("/admin/pages/add-page", "Add Page")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default Pages;
