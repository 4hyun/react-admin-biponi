import Link from "next/link";
import Image from "next/image";
import { CSSProperties, FC, Fragment, useCallback } from "react";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { Box, Button, useTheme } from "@mui/material";
// custom component
import AppRating from "components/AppRating";
import { FlexItemCenter } from "components/flex-box";
import { H3, Paragraph, Span } from "components/Typography";
// custom context
import { useAppContext } from "contexts/AppContext";
// cart item data type for typescript
import { CartItem } from "reducers/cartReducer";
// styled components
import { ContentWrapper, ImageWrapper, StyledBazarCard, StyledChip } from "./styles";

// =========================================================
interface ProductCardProps {
  off: number;
  unit: string;
  stock: number;
  title: string;
  price: number;
  imgUrl: string;
  rating?: number;
  className?: string;
  id: string | number;
  hideRating?: boolean;
  style?: CSSProperties;
  hoverEffect?: boolean;
  showProductSize?: boolean;
}
// =========================================================

const ProductCard: FC<ProductCardProps> = (props) => {
  const { off, id, title, price, imgUrl, rating, hideRating, hoverEffect, stock, unit } = props;

  const { palette } = useTheme();
  const { state, dispatch } = useAppContext();

  const cartItem: CartItem | undefined = state.cart.cartList.find((item) => item.id === id);
  const afterDiscountPrice = price - (price * off) / 100;

  const handleCartAmountChange = useCallback(
    (amount: number) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id,
          imgUrl,
          name: title,
          qty: amount,
          price: afterDiscountPrice,
        },
      });
    },
    [afterDiscountPrice, dispatch, id, imgUrl, title]
  );

  return (
    <StyledBazarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {off !== 0 && <StyledChip color="primary" size="small" label={`${off}% off`} />}

        <Box bgcolor="#efefef" height="100%">
          <Link href={`/product/${id}`}>
            <Image
              alt={title}
              src={imgUrl}
              width={190}
              height={190}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          </Link>
        </Box>
      </ImageWrapper>

      <ContentWrapper>
        <Link href={`/product/${id}`}>
          <H3
            mb={0.5}
            title={title}
            fontSize="14px"
            textAlign="left"
            fontWeight="600"
            className="title"
            color="text.secondary"
          >
            {title}
          </H3>
        </Link>

        {!hideRating ? (
          <FlexItemCenter gap={1} mb={1}>
            <AppRating value={rating || 0} color="warn" readOnly />{" "}
            <Span sx={{ color: palette.grey[600] }}>({rating ?? 0})</Span>
          </FlexItemCenter>
        ) : null}

        <FlexItemCenter gap={1}>
          <Paragraph fontWeight="600" color="primary.main">
            ${afterDiscountPrice}
          </Paragraph>

          {off !== 0 && (
            <Paragraph color="grey.600" fontWeight="600">
              <del>{price?.toFixed(2)}</del>
            </Paragraph>
          )}

          {unit && (
            <Paragraph fontWeight="600" fontSize={13} color="secondary.main">
              / {unit}
            </Paragraph>
          )}
        </FlexItemCenter>

        <FlexItemCenter
          mt={1}
          gap={2}
          className="add-cart"
          justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
        >
          <Button
            fullWidth
            color="primary"
            variant="outlined"
            onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
            disabled={stock === 0}
            sx={{ padding: "3px" }}
          >
            <Add fontSize="small" />
          </Button>

          {!!cartItem?.qty && (
            <Fragment>
              <Paragraph color="text.primary" fontWeight="600">
                {cartItem?.qty}
              </Paragraph>

              <Button
                fullWidth
                color="primary"
                variant="outlined"
                sx={{ padding: "3px" }}
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Remove fontSize="small" />
              </Button>
            </Fragment>
          )}
        </FlexItemCenter>
      </ContentWrapper>
    </StyledBazarCard>
  );
};

export default ProductCard;
