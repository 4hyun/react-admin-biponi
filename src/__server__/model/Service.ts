import mongoose, { model, Schema } from "mongoose";

const serviceSchema = new Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || model("Service", serviceSchema);
export default Service;
