import Router from "next/router";
import React, { FC, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import toast from "react-hot-toast";
// custom components
import { Paragraph } from "components/Typography";
import DeliveryAddress from "./delivery-address/DeliveryAddress";
import DeliveryDateTime from "./delivery-date-time/DeliveryDateTime";
import PaymentDetails from "./payment-details/PaymentDetails";
// custom context
import { useAppContext } from "contexts/AppContext";
// cart item data type for typescript
import { CartItem } from "__types__/common";
// utils function for error message
import getErrorMessage from "utils/getErrorMessage";

// ==============================================================
type CheckFormProps = {
  tax: number;
  amount: number;
  subTotal: number;
  cartList: CartItem[];
};
// ==============================================================

const CheckoutForm: FC<CheckFormProps> = ({ amount, subTotal, tax, cartList }) => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { data: session } = useSession();
  const { dispatch } = useAppContext();

  const items = cartList.map((item) => ({
    productId: item.id,
    quantity: item.qty,
    price: item.price,
    img: item.imgUrl,
    name: item.name,
  }));

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingBtn(true);

    try {
      if (session) {
        const { data } = await axios.post("/api/stripe", { email: session.user.email });

        await axios.post("/api/orders", {
          tax,
          items,
          values,
          subTotal,
          customerId: data.id,
          amount: +amount.toFixed(2),
        });

        toast.success("Order Created Successfully");
        setLoadingBtn(false);
        dispatch({ type: "CLEAR_CART" });
        Router.push("/order-confirmation");
      }
    } catch (error) {
      setLoadingBtn(false);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => {
        // edit handle form submit with error message
        const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          handleSubmit(e);
          // if (Object.keys(errors).length) {
          //   Object.keys(errors).forEach((key) => {
          //     if (errors[key] && touched[key]) toast.error(errors[key].toString());
          //   });
          // }
        };

        return (
          <form onSubmit={handleOnSubmit}>
            <DeliveryDateTime
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
            />

            <DeliveryAddress values={values} setFieldValue={setFieldValue} />

            <PaymentDetails
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />

            {cartList.length === 0 && (
              <Paragraph sx={{ color: "red", textAlign: "center", mb: 2 }}>
                You didn't select any product for place order
              </Paragraph>
            )}

            <LoadingButton
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              loading={loadingBtn}
              disabled={cartList.length === 0}
            >
              Place Order
            </LoadingButton>
          </form>
        );
      }}
    </Formik>
  );
};

const initialValues = {
  checkCard: false,
  card: {},
  date: "",
  time: "",
  address: "",
  voucher: "",
  cardHolderName: "",
  cardNumber: "",
  cardMonth: "",
  cardYear: "",
  cardCVC: "",
  cardSaved: false,
  paymentType: "card",
};

const validationSchema = yup.object().shape({
  checkCard: yup.boolean(),
  paymentType: yup.string(),
  card: yup.object().when(["checkCard", "paymentType"], {
    is: (checkCard: boolean, paymentType: string) => !checkCard && paymentType === "card",
    then: (schema) => schema.required("Card is required!"),
  }),

  date: yup.string().required("Delivery Date is required"),
  time: yup.string().required("Delivery Time is required"),
  address: yup.mixed().required("Address is required"),

  cardHolderName: yup.string().when(["checkCard", "paymentType"], {
    is: (checkCard: boolean, paymentType: string) => !checkCard && paymentType === "card",
    then: (schema) => schema.required("Card holder name is required"),
  }),

  cardNumber: yup.number().when(["checkCard", "paymentType"], {
    is: (checkCard: boolean, paymentType: string) => !checkCard && paymentType === "card",
    then: (schema) => schema.required("Card Number is required"),
  }),

  cardMonth: yup.string().when(["checkCard", "paymentType"], {
    is: (checkCard: boolean, paymentType: string) => !checkCard && paymentType === "card",
    then: (schema) => schema.required("Card Expiration Month is required"),
  }),

  cardYear: yup.number().when(["checkCard", "paymentType"], {
    is: (checkCard: boolean, paymentType: string) => !checkCard && paymentType === "card",
    then: (schema) => schema.required("Card Expiration Year is required"),
  }),

  cardCVC: yup.number().when(["checkCard", "paymentType"], {
    is: (checkCard: boolean, paymentType: string) => !checkCard && paymentType === "card",
    then: (schema) => schema.required("Card CVC is required"),
  }),

  voucher: yup.string(),
  cardSaved: yup.boolean().default(() => false),
});

export default CheckoutForm;
