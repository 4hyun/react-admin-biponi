import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
// custom components
import AppStore from "components/AppStore";
import { Paragraph } from "components/Typography";
// custom context
import { useSettingContext } from "contexts/SettingContext";
// custom styled components
import { FooterLink, FooterWrapper } from "./styled";

const HomeFooter: FC = () => {
  const { footerSetting } = useSettingContext();

  return (
    <FooterWrapper>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Link href="/">
            <Image
              alt="logo"
              width={120}
              height={35}
              src={footerSetting?.logo?.location}
              style={{ objectFit: "contain" }}
            />
          </Link>
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          <Paragraph mb={2.5} color="grey.500" maxWidth="370px">
            {footerSetting?.description}
          </Paragraph>

          <AppStore />
        </Grid>

        <Grid item md={6} sm={6} xs={12}>
          {footerSetting?.column_three?.links?.map((item: any, ind: number) => (
            <FooterLink href="/" key={ind}>
              {item?.name}
            </FooterLink>
          ))}
        </Grid>
      </Grid>
    </FooterWrapper>
  );
};

export default HomeFooter;
