import { FC } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { scroller } from "react-scroll";
import SimpleBar from "simplebar-react";
// custom components
import FlexBox from "components/flex-box/FlexBox";
import { H5, Span } from "components/Typography";
// custom icons
import appIcons from "components/icons";
import Home from "components/icons/Home";
// custom styled components
import { BorderBox, NavbarRoot, Span1, Span2 } from "./styles";
// category & icon keys data type for typescript
import { Category } from "__types__/common";
import KeyOfIcons from "__types__/keyOfIcons";

// ===========================================================
interface HomeSideBarNavProps {
  isFixed?: boolean;
  navList: Category[];
  selectedCategory?: string;
  handleCloseMobileSideBar?: () => void;
  handleChangeCategory: (category: string) => void;
}
// ===========================================================

const HomeSideBarNav: FC<HomeSideBarNavProps> = (props) => {
  const {
    isFixed,
    navList,
    handleChangeCategory,
    selectedCategory = "",
    handleCloseMobileSideBar,
  } = props;

  const { pathname, push } = useRouter();

  const handleClick = (name: string) => {
    handleChangeCategory(name);

    if (pathname !== "/") {
      push("/");
      return;
    }

    if (handleCloseMobileSideBar) {
      handleCloseMobileSideBar();
      scroller.scrollTo("products", { delay: 0, offset: -85, smooth: true, duration: 1000 });
      return;
    }
  };

  return (
    <SimpleBar style={{ maxHeight: "100%" }}>
      <NavbarRoot fixed={isFixed ? 1 : 0}>
        <Box padding="20px 20px 5px 20px">
          <H5>Top Categories</H5>
          <BorderBox>
            <Span1 bgcolor="primary.200" />
            <Span2 />
          </BorderBox>
        </Box>

        <FlexBox
          py={1}
          gap={1.5}
          color="grey.700"
          className="linkList"
          onClick={() => handleClick("")}
          sx={{ cursor: "pointer", color: selectedCategory === "" ? "primary.main" : "initial" }}
        >
          <Home fontSize="small" color="inherit" />

          <Span color="inherit" fontWeight="600" flex="1 1 0">
            Home
          </Span>
        </FlexBox>

        {navList.map((item) => {
          const Icon = appIcons[item.icon as KeyOfIcons];

          return (
            <FlexBox
              py={1}
              gap={1.5}
              key={item._id}
              color="grey.700"
              className="linkList"
              onClick={() => handleClick(item.name)}
              sx={{
                cursor: "pointer",
                color: selectedCategory === item.name ? "primary.main" : "initial",
              }}
            >
              <Icon fontSize="small" color="inherit" />
              <Span color="inherit" fontWeight="600">
                {item.name}
              </Span>
            </FlexBox>
          );
        })}
      </NavbarRoot>
    </SimpleBar>
  );
};

export default HomeSideBarNav;
