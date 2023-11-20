import React, { FC, useEffect } from "react";
import { Grid, MenuItem, TextField, Box } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
// custom components
import Card1 from "components/Card1";
import TitleBar from "../TitleBar";
// custom hook for date time functionality
import useDateTime from "./useDateTime";

// ----------------------------------------------------
type DeliveryDateTimeProps = {
  values: any;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};

// --------------------------------------------------------------------

const DeliveryDateTime: FC<DeliveryDateTimeProps> = (props) => {
  const { values, errors, touched, handleChange } = props;

  const { dateList, timeList } = useDateTime();

  useEffect(() => {
    values.date = dateList[0].value;
  }, [dateList, values]);

  return (
    <Card1 sx={{ mb: 3 }}>
      <TitleBar title="Delivery Date and Time" number={1} />

      <Box mb={3.5}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <TextField
              select
              fullWidth
              type="text"
              name="date"
              value={values.date}
              label="Delivery Date"
              onChange={handleChange}
              error={!!touched.date && !!errors.date}
              helperText={(touched.date && errors.date) as string}
            >
              {dateList.map((item) => (
                <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              select
              fullWidth
              type="text"
              name="time"
              value={values.time}
              label="Delivery Time"
              onChange={handleChange}
              error={!!touched.time && !!errors.time}
              helperText={(touched.time && errors.time) as string}
            >
              {timeList.map((item) => (
                <MenuItem value={item.time} key={item._id}>
                  {item.time}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Card1>
  );
};

export default DeliveryDateTime;
