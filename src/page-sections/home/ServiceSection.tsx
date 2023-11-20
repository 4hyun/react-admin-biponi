import { FC } from "react";
import { Box, Container, Grid } from "@mui/material";
// custom components
import { FlexItemCenter } from "components/flex-box";
import { Paragraph, Span } from "components/Typography";
// icons
import appIcons from "components/icons";
// service & icon keys data type for typescript
import { Service } from "__types__/common";
import KeyOfIcons from "__types__/keyOfIcons";
// custom styled component
import { ServiceItem } from "./styled";

// ==============================================================
type ServiceSectionProps = { services: Service[] };
// ==============================================================

const ServiceSection: FC<ServiceSectionProps> = ({ services }) => {
  const servicesData = services.slice(0, 4);

  return (
    <Container>
      <Grid container spacing={3}>
        {servicesData?.map((item) => {
          const key = item.icon as KeyOfIcons;
          const Icon = appIcons[key];

          return (
            <Grid item lg={3} md={6} sm={6} xs={12} key={item._id}>
              <ServiceItem gap={2}>
                <FlexItemCenter color="grey.600" fontSize={50}>
                  <Icon sx={{ fontSize: 50, color: "grey.600" }} />
                </FlexItemCenter>

                <Box>
                  <Paragraph color="grey.900" fontSize="1rem" fontWeight={700}>
                    {item.title}
                  </Paragraph>
                  <Span color="grey.600">{item.subTitle}</Span>
                </Box>
              </ServiceItem>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ServiceSection;
