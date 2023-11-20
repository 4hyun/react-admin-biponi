import { useRouter } from "next/router";
import { Category, Construction, Image, LocalShipping, Slideshow } from "@mui/icons-material";
// icon components
import Settings from "@mui/icons-material/Settings";
import Dashboard from "@mui/icons-material/Dashboard";
import Assignment from "@mui/icons-material/Assignment";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Pages from "components/icons/Pages";
import User2 from "components/icons/User2";
// custom component
import FlexBox from "components/flex-box/FlexBox";
// styled components
import { NavigationWrapper, DashboardNavItem } from "../styled";

const AdminDashboardNavigation = () => {
  const { pathname } = useRouter();

  return (
    <NavigationWrapper
      sx={{ px: "0px", py: "1.5rem", color: "grey.900", "& a:last-child": { mb: 0 } }}
    >
      {linkList.map(({ title, href, Icon }) => (
        <DashboardNavItem href={href} key={title} isCurrentPath={pathname.includes(href)}>
          <FlexBox alignItems="center" gap={1}>
            <Icon className="nav-icon" fontSize="small" color="inherit" />
            <span>{title}</span>
          </FlexBox>
        </DashboardNavItem>
      ))}
    </NavigationWrapper>
  );
};

const linkList = [
  { href: "/admin/dashboard", title: "Dashboard", Icon: Dashboard },
  { href: "/admin/products", title: "Products", Icon: Assignment },
  { href: "/admin/orders", title: "Orders", Icon: ShoppingCart },
  { href: "/admin/users", title: "Users", Icon: User2 },
  { href: "/admin/site-settings", title: "Site Settings", Icon: Settings },
  { href: "/admin/delivery-time", title: "Delivery Time", Icon: LocalShipping },

  { href: "/admin/category-list", title: "Categories", Icon: Category },
  { href: "/admin/slider", title: "Product Slider", Icon: Slideshow },
  { href: "/admin/services", title: "Services", Icon: Construction },
  { href: "/admin/pages", title: "Pages", Icon: Pages },
  { href: "/admin/icons", title: "Icons", Icon: Image },
];

export default AdminDashboardNavigation;
