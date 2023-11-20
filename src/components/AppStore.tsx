import { FC } from "react";
import Box from "@mui/material/Box";
// custom component
import FlexBox from "./flex-box/FlexBox";
import { Paragraph } from "./Typography";
// custom icons
import PlayStore from "./icons/PlayStore";
import AppleStore from "./icons/AppleStore";

const AppStore: FC = () => {
  const appList = [
    { icon: PlayStore, title: "Google Play", subtitle: "Get it on", url: "/" },
    { icon: AppleStore, title: "App Store", subtitle: "Download on the", url: "/" },
  ];

  return (
    <FlexBox flexWrap="wrap" m={-1}>
      {appList.map((item) => {
        return (
          <a href="/" key={item.title} target="_blank" rel="noreferrer noopener">
            <Box
              m={1}
              gap={1}
              color="white"
              p="10px 16px"
              display="flex"
              bgcolor="#0C2A4D"
              borderRadius="5px"
              alignItems="center"
            >
              <item.icon />

              <Box>
                <Paragraph fontSize="8px" fontWeight="600" lineHeight="1">
                  {item.subtitle}
                </Paragraph>
                <Paragraph fontWeight="700">{item.title}</Paragraph>
              </Box>
            </Box>
          </a>
        );
      })}
    </FlexBox>
  );
};

export default AppStore;
