import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import MailOutline from "@mui/icons-material/MailOutline";
import CallOutlined from "@mui/icons-material/CallOutlined";

import { Span } from "components/Typography";
import NavLink from "components/nav-link/NavLink";
import { FlexItemCenter } from "components/flex-box";
import { useSettingContext } from "contexts/SettingContext";
import { layoutConstant } from "utils/constants";

// styled component
const TopbarWrapper = styled("div")(({ theme }) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  "& .link": { color: theme.palette.secondary.contrastText },
  [theme.breakpoints.down("md")]: { display: "none" },
}));

const Topbar = () => {
  const { topbarSetting } = useSettingContext();

  return (
    <TopbarWrapper>
      <Container
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexItemCenter gap={3}>
          {topbarSetting?.phone && (
            <FlexItemCenter gap={1}>
              <CallOutlined fontSize="small" />
              <Span>{topbarSetting?.phone}</Span>
            </FlexItemCenter>
          )}

          {topbarSetting?.email && (
            <FlexItemCenter gap={1}>
              <MailOutline fontSize="small" />
              <Span>{topbarSetting.email}</Span>
            </FlexItemCenter>
          )}
        </FlexItemCenter>

        <FlexItemCenter gap={3}>
          {topbarSetting?.links?.map((item: any, index: number) => (
            <NavLink className="link" href={item.link} key={index}>
              {item.name}
            </NavLink>
          ))}
        </FlexItemCenter>
      </Container>
    </TopbarWrapper>
  );
};

export default Topbar;
