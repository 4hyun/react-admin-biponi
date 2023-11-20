import { Fragment, ReactElement } from "react";
import { Avatar, Box, Card } from "@mui/material";
import Person from "@mui/icons-material/Person";
import format from "date-fns/format";
import useSWR from "swr";
// custom components
import Loading from "components/Loading";
import TableRow from "components/TableRow";
import getHeaderLink from "components/getHeaderLink";
import { FlexItemCenter, FlexBox } from "components/flex-box";
import DashboardPageHeader from "components/DashboardPageHeader";
import { H5, Paragraph, Small, Span } from "components/Typography";
// layout component
import { NextPageWithLayout } from "../_app";
import UserDashboardLayout from "components/layouts/user-dashboard/Layout";
// user data type for typescript
import { User } from "__types__/common";

const Profile: NextPageWithLayout = () => {
  const { data: userInfo, error, isLoading } = useSWR<User>("/api/users/details");

  // SHOW LOADING STATUS WHEN DATA FETCHING
  if (isLoading) return <Loading height={200} />;

  // SHOW ERROR MESSAGE WHEN A ERROR OCCUR
  if (error) return <Paragraph>Something Error Occurred!</Paragraph>;

  // SHOW COMPONENT DATA WHEN ALL DATA IS EXIST
  if (userInfo) {
    const { avatar, email, first_name, last_name, dateOfBirth, phone } = userInfo || {};

    return (
      <Fragment>
        <Card component={FlexItemCenter} gap={1.5} p={2.5} mb={3}>
          <Avatar src={avatar} sx={{ height: 64, width: 64 }} />
          <Box flex="1 1 0">
            <H5 my="0px">{`${first_name} ${last_name}`}</H5>
            <Paragraph color="grey.600">
              Balance: <Span color="primary.main">$500</Span>
            </Paragraph>
          </Box>
        </Card>

        <TableRow
          sx={{
            gap: 2,
            padding: 3,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "1fr 1fr 1.5fr 1fr 1fr",
            },
          }}
        >
          <FlexBox flexDirection="column">
            <Small color="grey.600" mb={0.5} textAlign="left">
              First Name
            </Small>

            <span>{first_name}</span>
          </FlexBox>

          <FlexBox flexDirection="column">
            <Small color="grey.600" mb={0.5} textAlign="left">
              Last Name
            </Small>

            <span>{last_name}</span>
          </FlexBox>

          <FlexBox flexDirection="column">
            <Small color="grey.600" mb={0.5} textAlign="left">
              Email
            </Small>

            <span>{email}</span>
          </FlexBox>

          <FlexBox flexDirection="column">
            <Small color="grey.600" mb={0.5} textAlign="left">
              Phone
            </Small>

            <span>{phone || "-"}</span>
          </FlexBox>

          <FlexBox flexDirection="column">
            <Small color="grey.600" mb={0.5}>
              Birth date
            </Small>

            <span className="pre">
              {dateOfBirth ? format(new Date(dateOfBirth), "dd MMM, yyyy") : "-"}
            </span>
          </FlexBox>
        </TableRow>
      </Fragment>
    );
  }

  return null;
};

// =================================================================
Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <UserDashboardLayout>
      <DashboardPageHeader
        Icon={Person}
        title="My Profile"
        button={getHeaderLink("/profile/edit", "Edit Profile")}
      />
      {page}
    </UserDashboardLayout>
  );
};
// =================================================================

export default Profile;
