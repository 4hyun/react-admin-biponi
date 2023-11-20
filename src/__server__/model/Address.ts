import mongoose, { model, Schema } from "mongoose";
import User from "./User";

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    street1: {
      type: String,
      required: true,
    },
    street2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Address = mongoose.models.Address || model("Address", addressSchema);
export default Address;
