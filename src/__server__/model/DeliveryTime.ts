import mongoose, { model, Schema } from "mongoose";

const deliveryTimeSchema = new Schema(
  {
    time: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

// create indexing
deliveryTimeSchema.index({ slug: "text" });

const Delivery_Time = mongoose.models.Delivery_Time || model("Delivery_Time", deliveryTimeSchema);
export default Delivery_Time;
