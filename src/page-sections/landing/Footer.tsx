import { FC } from "react";
import Facebook from "@mui/icons-material/Facebook";
import Favorite from "@mui/icons-material/Favorite";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import Youtube from "@mui/icons-material/YouTube";
import { Box, Container } from "@mui/material";
import FlexBox from "components/flex-box/FlexBox";

const Footer: FC = () => {
  return (
    <Box sx={{ backgroundColor: "white", py: 3, mt: 4 }}>
      <Container>
        <FlexBox justifyContent="space-between" flexWrap="wrap">
          <FlexBox className="flex" alignItems="center" gap={1}>
            Developed with <Favorite fontSize="small" color="primary" /> & Care by Ui Lib
          </FlexBox>

          <FlexBox gap={1}>
            {iconList.map((item, ind) => (
              <a href={item.url} target="_blank" rel="noreferrer noopenner" key={ind}>
                <item.icon
                  color="inherit"
                  sx={{
                    fontSize: "1.25rem",
                    transition: "0.2s ease-in-out",
                    "&:hover": { color: "primary.main" },
                  }}
                />
              </a>
            ))}
          </FlexBox>
        </FlexBox>
      </Container>
    </Box>
  );
};

const iconList = [
  { icon: Facebook, url: "https://www.facebook.com/UILibOfficial" },
  { icon: Twitter, url: "https://twitter.com/uilibofficial" },
  {
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
  },
  { icon: Instagram, url: "https://www.instagram.com/uilibofficial/" },
];

export default Footer;
