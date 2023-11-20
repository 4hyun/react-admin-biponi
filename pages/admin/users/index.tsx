import { useRouter } from "next/router";
import { Fragment, ReactElement, useState } from "react";
import toast from "react-hot-toast";
import Delete from "@mui/icons-material/Delete";
import { Avatar, Box, IconButton, Pagination } from "@mui/material";
import axios from "axios";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import User2 from "components/icons/User2";
import { H5, H6, Paragraph } from "components/Typography";
import getHeaderLink from "components/getHeaderLink";
import ConfirmationAlert from "components/ConfirmationAlert";
import { FlexContentCenter, FlexItemCenter } from "components/flex-box";
// layout
import { NextPageWithLayout } from "../../_app";
import DashboardPageHeader from "components/DashboardPageHeader";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// utils function for show error message
import getErrorMessage from "utils/getErrorMessage";
// utils function for pagination
import pagination from "__server__/utils/pagination";
// user data type for typescript
import { User } from "__types__/common";

const Users: NextPageWithLayout = () => {
  const { push } = useRouter();
  const [deleteId, setDeleteId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: users = [], isLoading, mutate } = useSWR<User[]>("/api/users");

  const currentUsers = pagination(currentPage, users);

  // HANDLE CLOSE CONFIRMATION DIALOG
  const dialogClose = () => {
    setDeleteId("");
    setDialogOpen(false);
  };

  // HANDLE DELETE USER FORM USER LIST
  const handleDeleteUser = async () => {
    if (deleteId) {
      try {
        await axios.delete(`/api/users/${deleteId}`);
        setDeleteId("");
        setDialogOpen(false);
        toast.success("User deleted Successfully");
        mutate();
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading />;

  return (
    <Fragment>
      <TableRow
        elevation={0}
        sx={{
          gap: 1,
          padding: "0px 18px",
          bgcolor: "transparent",
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: { sm: "2.5fr 2fr 2fr 1fr 1fr", xs: "1fr 1fr" },
        }}
      >
        <H5 color="grey.600" textAlign="left">
          Name
        </H5>

        <H5 color="grey.600" textAlign="left">
          Email
        </H5>

        <H5 color="grey.600" textAlign="center">
          Phone
        </H5>

        <H5 color="grey.600" textAlign="center">
          Role
        </H5>
      </TableRow>

      {currentUsers.map((user: User) => {
        const { _id, first_name, last_name, email, avatar, phone, role } = user;

        return (
          <TableRow
            key={_id}
            onClick={() => push(`/admin/users/${_id}`)}
            sx={{
              gap: 1,
              my: "1rem",
              display: "grid",
              padding: "6px 18px",
              gridTemplateColumns: { sm: "2.5fr 2fr 2fr 1fr 1fr", xs: "1fr 1fr" },
            }}
          >
            <FlexItemCenter gap={1}>
              <Avatar src={avatar} sx={{ height: 36, width: 36 }} />
              <H6>
                {first_name} {last_name}
              </H6>
            </FlexItemCenter>

            <Paragraph textAlign="left">{email}</Paragraph>
            <Paragraph textAlign="center">{phone || "-"}</Paragraph>
            <Paragraph textAlign="center">{role}</Paragraph>

            <Box color="grey.600" textAlign="center" sx={{ display: { xs: "none", md: "block" } }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setDialogOpen(true);
                  setDeleteId(_id);
                }}
              >
                <Delete fontSize="small" color="inherit" />
              </IconButton>
            </Box>
          </TableRow>
        );
      })}

      <ConfirmationAlert
        open={dialogOpen}
        close={dialogClose}
        handleConfirm={handleDeleteUser}
        description="Want to remove this user."
      />

      <FlexContentCenter mt={5}>
        <Pagination
          count={Math.ceil(users.length / 10)}
          onChange={(_, value) => setCurrentPage(value)}
        />
      </FlexContentCenter>
    </Fragment>
  );
};

// ==============================================================
Users.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader
        title="Users"
        Icon={User2}
        button={getHeaderLink("/admin/users/add", "Add User")}
      />

      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default Users;
