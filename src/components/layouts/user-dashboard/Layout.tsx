import { FC, PropsWithChildren } from "react";
import { Container, Grid } from "@mui/material";
// custom components
import MainLayout from "../MainLayout";
import UserDashboardNavigation from "./Navigations";

const UserDashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <MainLayout>
    <Container sx={{ my: 4 }}>
      <Grid container spacing={3}>
        <Grid item lg={3} xs={12} sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <UserDashboardNavigation />
        </Grid>

        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </MainLayout>
);

export default UserDashboardLayout;
