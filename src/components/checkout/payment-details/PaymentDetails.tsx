import React, { FC } from "react";
import { FormikErrors, FormikTouched } from "formik";
import {
  Box,
  Grid,
  Radio,
  Divider,
  Checkbox,
  MenuItem,
  TextField,
  RadioGroup,
  CircularProgress,
  FormControlLabel,
} from "@mui/material";
import useSWR from "swr";
// custom components
import TitleBar from "../TitleBar";
import Card1 from "components/Card1";
import CreditCardItem from "./CreditCard";
import { Paragraph } from "components/Typography";
import { FlexBetween } from "components/flex-box";
// constant variables
import { months, years } from "utils/constants";
// Card data type for typescript version
import { CreditCard } from "__types__/common";

// ----------------------------------------------------
type PaymentDetailsProps = {
  values: any;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};
// --------------------------------------------------------------------

const PaymentDetails: FC<PaymentDetailsProps> = (props) => {
  const { values, errors, touched, handleChange, setFieldValue } = props;

  const { data: cards = [], isLoading } = useSWR<CreditCard[]>("/api/stripe/card");

  // handle toggle for saved cards
  const handleToggleSavedCard = (item: CreditCard) => {
    if (values.card.cardId === item.cardId) {
      setFieldValue("card", {});
      setFieldValue("checkCard", false);
    } else {
      setFieldValue("card", item);
      setFieldValue("checkCard", true);
    }
  };

  // when card input form disable
  const selectForm = () => {
    setFieldValue("card", {});
    setFieldValue("checkCard", false);
  };

  return (
    <Card1 sx={{ mb: 3 }}>
      <TitleBar title="Payment Details" number={3} />

      <RadioGroup name="paymentType" value={values.paymentType} onChange={(e) => handleChange(e)}>
        <FormControlLabel value="card" control={<Radio />} label="Payment Via Card" />

        {values.paymentType === "card" && (
          <Box mb={3.5} mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paragraph>Enter Card Information</Paragraph>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  name="cardHolderName"
                  label="Enter Your Name"
                  onClick={selectForm}
                  onChange={handleChange}
                  disabled={values.checkCard}
                  value={values.cardHolderName}
                  error={!!touched.cardHolderName && !!errors.cardHolderName}
                  helperText={(touched.cardHolderName && errors.cardHolderName) as string}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  name="cardNumber"
                  onClick={selectForm}
                  onChange={handleChange}
                  value={values.cardNumber}
                  disabled={values.checkCard}
                  label="Enter Your Card Number"
                  error={!!touched.cardNumber && !!errors.cardNumber}
                  helperText={(touched.cardNumber && errors.cardNumber) as string}
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <FlexBetween>
                  <TextField
                    select
                    fullWidth
                    type="number"
                    name="cardMonth"
                    onClick={selectForm}
                    label="Expire Card Month"
                    onChange={handleChange}
                    value={values.cardMonth}
                    disabled={values.checkCard}
                    error={!!touched.cardMonth && !!errors.cardMonth}
                    helperText={(touched.cardMonth && errors.cardMonth) as string}
                  >
                    {months.map((item, index) => (
                      <MenuItem value={index + 1} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    fullWidth
                    type="number"
                    name="cardYear"
                    onClick={selectForm}
                    label="Expire Card Year"
                    onChange={handleChange}
                    value={values.cardYear}
                    disabled={values.checkCard}
                    error={!!touched.cardYear && !!errors.cardYear}
                    helperText={(touched.cardYear && errors.cardYear) as string}
                    sx={{ mx: 3 }}
                  >
                    {years.map((item) => (
                      <MenuItem value={item} key={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    fullWidth
                    type="number"
                    name="cardCVC"
                    label="CVC/CVV"
                    onChange={handleChange}
                    value={values.cardCVC}
                    disabled={values.checkCard}
                    error={!!touched.cardCVC && !!errors.cardCVC}
                    helperText={(touched.cardCVC && errors.cardCVC) as string}
                  />
                </FlexBetween>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  name="cardSaved"
                  control={<Checkbox />}
                  label="Save this card"
                  onChange={handleChange}
                  disabled={values.checkCard}
                />
              </Grid>

              {/* SAVED CARD LIST */}
              {isLoading ? (
                <Grid item xs={12}>
                  <CircularProgress size={20} />
                </Grid>
              ) : (
                <Grid item container spacing={3}>
                  <Grid item xs={12}>
                    <Paragraph>Saved Cards</Paragraph>
                  </Grid>

                  {cards.map((item) => (
                    <CreditCardItem
                      card={item}
                      key={item.cardId}
                      handleToggleSavedCard={handleToggleSavedCard}
                      isActive={item.cardId === values.card.cardId}
                    />
                  ))}
                </Grid>
              )}
            </Grid>
          </Box>
        )}

        <Divider />

        <FormControlLabel value="cash" control={<Radio />} label="Cash on Delivery" />
      </RadioGroup>
    </Card1>
  );
};

export default PaymentDetails;
