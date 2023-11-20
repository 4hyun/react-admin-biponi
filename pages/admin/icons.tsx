import { ReactElement } from "react";
import { Box, Card } from "@mui/material";
import Image from "@mui/icons-material/Image";
// all icons
import appIcons from "components/icons";
// custom components
import { Paragraph } from "components/Typography";
import { FlexCenter, FlexBox } from "components/flex-box";
import DashboardPageHeader from "components/DashboardPageHeader";
// layout
import { NextPageWithLayout } from "../_app";
import AdminDashboardLayout from "components/layouts/admin-dashboard/Layout";
// icon keys data type for typescript
import KeyOfIcons from "__types__/keyOfIcons";

const Icons: NextPageWithLayout = () => {
  return (
    <FlexBox
      gap={2}
      flexWrap="wrap"
      sx={{ "&::after": { content: '""', flexGrow: 1000000000000 } }}
    >
      {Object.keys(appIcons)
        .sort()
        .map((name) => {
          const Icon = appIcons[name as KeyOfIcons];

          return (
            <Box sx={{ width: 100 }} key={name} flexGrow={1}>
              <Card component={FlexCenter} sx={{ height: 50, width: "100%" }}>
                <Icon />
              </Card>

              <Paragraph mt={0.5} textAlign="center" fontSize={10}>
                {name}
              </Paragraph>
            </Box>
          );
        })}
    </FlexBox>
  );
};

// ==============================================================
Icons.getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminDashboardLayout>
      <DashboardPageHeader title="Icons" Icon={Image} />
      {page}
    </AdminDashboardLayout>
  );
};
// ==============================================================

export default Icons;
