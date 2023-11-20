import { ReactElement } from "react";
import { GetStaticProps } from "next";
import { Container, Grid } from "@mui/material";
import type { NextPageWithLayout } from "../_app";
// custom components
import CheckoutForm from "components/checkout/CheckoutForm";
import CheckoutSummary from "components/checkout/CheckoutSummary";
import SecondaryLayout from "components/layouts/SecondaryLayout";
// custom context
import { useAppContext } from "contexts/AppContext";
// database query slug string
import { db_slug } from "utils/constants";
// database connection method
import connectDB from "__server__/db";
// settings data type interface for typescript
import Settings from "__server__/model/Settings";

// ==============================================================
interface Props {
  vatCharge: number;
  shippingCharge: number;
}
// ==============================================================

const Checkout: NextPageWithLayout<Props> = ({ shippingCharge = 0, vatCharge = 0 }) => {
  const { state } = useAppContext();
  const { cartList } = state.cart || {};

  const subTotal = cartList.reduce((prev, curr) => prev + curr.price * curr.qty, 0);
  const vat = (subTotal * vatCharge) / 100;
  const total = subTotal + vat + shippingCharge;

  return (
    <Container sx={{ py: 4, minHeight: "100vh" }}>
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} xs={12}>
          <CheckoutForm cartList={cartList} subTotal={subTotal} amount={total} tax={vat} />
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <CheckoutSummary
            tax={vat}
            total={total}
            cartList={cartList}
            subTotal={subTotal}
            shippingCharge={shippingCharge}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

// ==============================================================
Checkout.getLayout = function getLayout(page: ReactElement) {
  return <SecondaryLayout>{page}</SecondaryLayout>;
};
// ==============================================================

export const getStaticProps: GetStaticProps = async () => {
  await connectDB();
  const setting = await Settings.findOne({ slug: db_slug.shipping_vat });

  return {
    props: {
      vatCharge: setting?.values?.vat,
      shippingCharge: setting?.values?.shipping_charge,
    },
    revalidate: 10,
  };
};

export default Checkout;
