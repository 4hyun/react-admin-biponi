import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { Box, Divider, IconButton, useTheme } from "@mui/material";
// mui icons
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Clear from "@mui/icons-material/Clear";
import Remove from "@mui/icons-material/Remove";
// custom components
import AppAvatar from "components/AppAvatar";
import AppButton from "components/AppButton";
import LazyImage from "components/LazyImage";
import AppIconButton from "components/AppIconButton";
import { H5, Paragraph, Tiny } from "components/Typography";
import { FlexCenter, FlexItemCenter, FlexBox } from "components/flex-box";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
// custom app context
import { useAppContext } from "contexts/AppContext";
// data type for typescript
import { CartItem } from "__types__/common";

// ==============================================================
type MiniCartProps = { toggleSidenav: () => void };
// ==============================================================

const MiniCart: FC<MiniCartProps> = ({ toggleSidenav }) => {
  const router = useRouter();
  const { palette } = useTheme();
  const { state, dispatch } = useAppContext();
  const { cartList } = state.cart || {};

  const handleCartAmountChange = useCallback(
    (amount: number, product: CartItem) => () => {
      dispatch({ type: "CHANGE_CART_AMOUNT", payload: { ...product, qty: amount } });
    },
    [dispatch]
  );

  const handleNavigate = () => {
    router.push("/checkout");
    if (toggleSidenav) toggleSidenav();
  };

  const getTotalPrice = () => {
    return cartList.reduce((accumulator, item) => accumulator + item.price * item.qty, 0) || 0;
  };

  return (
    <Box width={{ sm: 380, xs: "100vw" }}>
      <Box overflow="auto" height={`calc(100vh - ${!!cartList.length ? "80px" : "0px"})`}>
        <FlexBox alignItems="center" justifyContent="space-between">
          <FlexBox alignItems="center" gap={1} mx={3} height={74} color="secondary.main">
            <ShoppingBagOutlined color="inherit" />
            <H5>{cartList.length} item</H5>
          </FlexBox>

          <IconButton onClick={toggleSidenav}>
            <Clear />
          </IconButton>
        </FlexBox>

        <Divider />

        {cartList.length === 0 && (
          <FlexCenter flexDirection="column" height="calc(100% - 75px)">
            <LazyImage
              alt="cart"
              width={90}
              height={100}
              src="/assets/images/logos/shopping-bag.svg"
            />
            <Box component="p" mt={2} color="grey.600" textAlign="center" maxWidth="200px">
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexCenter>
        )}

        {cartList.map((item: CartItem) => (
          <FlexItemCenter
            py={2}
            px={2.5}
            key={item.id}
            borderBottom={`1px solid ${palette.divider}`}
          >
            <FlexItemCenter flexDirection="column">
              <AppButton
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(item.qty + 1, item)}
                sx={{ height: "32px", width: "32px", borderRadius: "300px" }}
              >
                <Add fontSize="small" />
              </AppButton>

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>

              <AppButton
                color="primary"
                variant="outlined"
                disabled={item.qty === 1}
                onClick={handleCartAmountChange(item.qty - 1, item)}
                sx={{ height: "32px", width: "32px", borderRadius: "300px" }}
              >
                <Remove fontSize="small" />
              </AppButton>
            </FlexItemCenter>

            <Link href={`/product/${item.id}`}>
              <AppAvatar mx={2} src={item.imgUrl} alt={item.name} height={76} width={76} />
            </Link>

            <Box flex="1 1 0">
              <Link href={`/product/${item.id}`}>
                <H5 className="title" fontSize={14}>
                  {item.name}
                </H5>
              </Link>

              <Tiny color="grey.600">
                ${item.price.toFixed(2)} x {item.qty}
              </Tiny>

              <Paragraph fontWeight={600} color="primary.main" mt={0.5}>
                ${(item.qty * item.price).toFixed(2)}
              </Paragraph>
            </Box>

            <AppIconButton ml={2.5} size="small" onClick={handleCartAmountChange(0, item)}>
              <Close fontSize="small" />
            </AppIconButton>
          </FlexItemCenter>
        ))}
      </Box>

      {cartList.length > 0 && (
        <Box p={2.5}>
          <AppButton
            fullWidth
            color="primary"
            variant="contained"
            onClick={handleNavigate}
            sx={{ height: 40 }}
          >
            Checkout Now (${getTotalPrice().toFixed(2)})
          </AppButton>
        </Box>
      )}
    </Box>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => {},
};

export default MiniCart;
