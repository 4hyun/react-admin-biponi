import mongoose, { model, Schema } from "mongoose";
import Service from "./Service";

const serviceTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    services: [{ type: Schema.Types.ObjectId, ref: Service }],
  },
  { timestamps: true }
);

const Service_Type = mongoose.models.Service_Type || model("Service_Type", serviceTypeSchema);
export default Service_Type;
