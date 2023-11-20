import { FC, useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import axios from "axios";
import * as yup from "yup";

import { H3 } from "components/Typography";
import DeliveryTime from "__types__/deliveryTime";
import getErrorMessage from "utils/getErrorMessage";

// ==============================================
type DeliveryTimeFormProps = {
  time?: DeliveryTime;
  open: boolean;
  close: () => void;
  fetchTimes: () => void;
};
// ==============================================

const DeliveryTimeForm: FC<DeliveryTimeFormProps> = ({ open, close, fetchTimes, time }) => {
  const [loadingButton, setLoadingButton] = useState(false);

  const checkoutSchema = yup.object().shape({
    time: yup.string().required("Time is required"),
  });

  const initialValues = { time: time?.time || "" };

  const handleFormSubmit = async (values: typeof initialValues) => {
    setLoadingButton(true);

    try {
      if (!time) {
        await axios.post("/api/delivery-time", { time: values.time });
        toast.success("Delivery Time created successfully");
      } else {
        await axios.put(`/api/delivery-time/${time.slug}`, { time: values.time });
        toast.success("Delivery Time updated successfully");
      }

      setLoadingButton(false);
      fetchTimes();
      close();
    } catch (error) {
      toast.error(getErrorMessage(error));
      setLoadingButton(false);
    }
  };

  return (
    <Dialog onClose={close} open={open}>
      <DialogTitle>
        <H3>{time ? "Edit Delivery Time" : "Add New Delivery Time"}</H3>
      </DialogTitle>

      <DialogContent sx={{ pt: "10px !important" }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="time"
                value={values.time}
                onBlur={handleBlur}
                label="Delivery Time"
                onChange={handleChange}
                placeholder="10AM - 12PM"
                error={!!touched.time && !!errors.time}
                helperText={(touched.time && errors.time) as string}
              />

              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={loadingButton}
                sx={{ mt: "25px" }}
              >
                {time ? "Update" : "Create"}
              </LoadingButton>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryTimeForm;
