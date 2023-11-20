import { FC } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
// cart item data type for typescript
import { CartItem } from "reducers/cartReducer";
// custom components
import { Paragraph, Span } from "components/Typography";
import FlexBetween from "components/flex-box/FlexBetween";

// ==============================================================
type CheckoutSummaryProps = {
  tax: number;
  total: number;
  subTotal: number;
  cartList: CartItem[];
  shippingCharge: number;
};
// ==============================================================

const CheckoutSummary: FC<CheckoutSummaryProps> = (props) => {
  const { cartList, subTotal, total, tax, shippingCharge } = props;

  return (
    <Box>
      <Paragraph color="secondary.900" fontWeight="700" mb={3}>
        Your order
      </Paragraph>

      {cartList.map((item) => (
        <FlexBetween mb={3} key={item.name}>
          <Paragraph>
            <Span fontWeight="700" fontSize="14px">
              {item.qty}
            </Span>{" "}
            x {item.name}
          </Paragraph>
          <Paragraph>${item.price.toFixed(2)}</Paragraph>
        </FlexBetween>
      ))}

      <Divider sx={{ borderColor: "grey.300", mb: "1.5rem" }} />

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <Paragraph fontWeight="700">${subTotal.toFixed(2)}</Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Shipping:</Paragraph>
        <Paragraph fontWeight="700">${shippingCharge}</Paragraph>
      </FlexBetween>

      <FlexBetween mb={1}>
        <Paragraph color="grey.600">Vat:</Paragraph>
        <Paragraph fontWeight="700">${tax.toFixed(2)}</Paragraph>
      </FlexBetween>

      <Divider sx={{ borderColor: "grey.300", mt: 3, mb: 3 }} />

      <FlexBetween fontWeight="700" mb={1}>
        <Paragraph>Total:</Paragraph>
        <Paragraph fontWeight="700">${total.toFixed(2)}</Paragraph>
      </FlexBetween>
    </Box>
  );
};

export default CheckoutSummary;
