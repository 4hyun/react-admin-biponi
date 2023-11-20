import { FC } from "react";
import Link from "next/link";
import { Box, Container, Grid, styled } from "@mui/material";
import appIcons from "components/icons";
// custom components
import AppImage from "components/AppImage";
import AppStore from "components/AppStore";
import { Paragraph } from "components/Typography";
import FlexBox from "components/flex-box/FlexBox";
import AppIconButton from "components/AppIconButton";
// custom app context
import { useSettingContext } from "contexts/SettingContext";
import KeyOfIcons from "__types__/keyOfIcons";

// styled component
const StyledLink = styled(Link)(({ theme }) => ({
  borderRadius: 4,
  display: "block",
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": { color: theme.palette.grey[100] },
}));

const Footer: FC = () => {
  // get all social links & footer content setting
  const { footerSetting, allLinks } = useSettingContext();

  const appLinks = allLinks?.appLinks?.filter((item: any) => item.link) || [];
  const social_links = allLinks?.socialLinks?.filter((item: any) => item.link) || [];

  return (
    <footer>
      <Box bgcolor="#0c0e30">
        <Container sx={{ p: "1rem", color: "white" }}>
          <Box py={10} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <AppImage mb={2.5} src={footerSetting?.logo?.location} width={120} alt="logo" />
                </Link>

                <Paragraph mb={2.5} color="grey.500">
                  {footerSetting?.description}
                </Paragraph>

                {appLinks.length > 0 && <AppStore />}
              </Grid>

              <Grid item lg={2} md={6} sm={6} xs={12}>
                {footerSetting?.column_two?.heading && (
                  <Box fontSize="25px" fontWeight="600" mb={2.5} lineHeight="1" color="white">
                    {footerSetting.column_two.heading}
                  </Box>
                )}

                <div>
                  {footerSetting?.column_two?.links.map((item: any, ind: number) => (
                    <StyledLink href={item.link} key={ind}>
                      {item.name}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                {footerSetting?.column_three?.heading && (
                  <Box fontSize="25px" fontWeight="600" mb={2.5} lineHeight="1" color="white">
                    {footerSetting?.column_three?.heading}
                  </Box>
                )}

                <div>
                  {footerSetting?.column_three?.links.map((item: any, ind: number) => (
                    <StyledLink href={item.link} key={ind}>
                      {item.name}
                    </StyledLink>
                  ))}
                </div>
              </Grid>

              <Grid item lg={3} md={6} sm={6} xs={12}>
                {footerSetting?.column_four?.heading && (
                  <Box fontSize="25px" fontWeight="600" mb={2.5} lineHeight="1" color="white">
                    {footerSetting?.column_four?.heading}
                  </Box>
                )}

                {footerSetting?.column_four?.description && (
                  <Box
                    py={0.6}
                    color="grey.500"
                    dangerouslySetInnerHTML={{ __html: footerSetting.column_four.description }}
                    sx={{ "& p": { mt: 0, mb: 1 } }}
                  />
                )}

                <FlexBox className="flex" mx={-0.625}>
                  {social_links?.map((item: any, ind: number) => {
                    const Icon = appIcons[item.icon as KeyOfIcons];

                    return (
                      <a href={item.url} target="_blank" rel="noreferrer noopenner" key={ind}>
                        <AppIconButton
                          m={0.5}
                          padding="10px"
                          fontSize="12px"
                          bgcolor="rgba(0,0,0,0.2)"
                        >
                          <Icon fontSize="inherit" />
                        </AppIconButton>
                      </a>
                    );
                  })}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
