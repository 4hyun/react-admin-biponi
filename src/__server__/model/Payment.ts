import mongoose, { model, Schema } from "mongoose";
import User from "./User";

const paymentSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: User, required: true },
  status: { type: String, required: true },
  gateway: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  token: { type: String },
  card: {
    brand: { type: String },
    panLastFour: { type: String },
    expirationMonth: { type: String },
    expirationYear: { type: String },
    cvvVerified: { type: Boolean },
  },
});

const Payment = mongoose.models.Payment || model("Payment", paymentSchema);
export default Payment;
