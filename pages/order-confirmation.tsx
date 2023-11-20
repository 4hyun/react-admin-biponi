import Link from "next/link";
import { ReactElement } from "react";
import { Container, Grid, styled } from "@mui/material";
// custom components
import AppCard from "components/AppCard";
import AppButton from "components/AppButton";
import LazyImage from "components/LazyImage";
import { H1, Paragraph } from "components/Typography";
// layout component
import { NextPageWithLayout } from "./_app";
import MainLayout from "components/layouts/MainLayout";

// styled components
const Wrapper = styled(AppCard)({
  width: "630px",
  padding: "3rem",
  textAlign: "center",
});

const StyledButton = styled(AppButton)({
  marginTop: "2rem",
  padding: "11px 24px",
});

const OrderConfirmation: NextPageWithLayout = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Grid container justifyContent="center" mb="10rem">
        <Wrapper>
          <LazyImage
            width={116}
            height={116}
            alt="complete"
            src="/assets/images/illustrations/party-popper.svg"
          />

          <H1 lineHeight={1.1} mt="1.5rem">
            Your order is completed!
          </H1>

          <Paragraph color="grey.800" mt="0.3rem">
            You will be receiving confirmation email with order details.
          </Paragraph>

          <Link href="/orders">
            <StyledButton
              disableElevation
              color="primary"
              variant="contained"
              className="button-link"
            >
              Order Dashboard
            </StyledButton>
          </Link>
        </Wrapper>
      </Grid>
    </Container>
  );
};

// ====================================================================
OrderConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
// ====================================================================

export default OrderConfirmation;
