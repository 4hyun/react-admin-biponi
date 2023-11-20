import { FC, PropsWithChildren } from "react";
import { Container, Grid } from "@mui/material";
// custom components
import AdminDashboardNavigation from "./Navigations";
import MainLayout from "../MainLayout";

const AdminDashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <MainLayout>
    <Container sx={{ my: 4 }}>
      <Grid container spacing={3}>
        <Grid item lg={3} xs={12} sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          <AdminDashboardNavigation />
        </Grid>

        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </MainLayout>
);

export default AdminDashboardLayout;
