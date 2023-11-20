import mongoose, { model, Schema } from "mongoose";
import Product from "./Product";

const productTypeSchema = new Schema(
  {
    description: {
      type: String,
    },
    heading: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: Product,
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
      index: "text",
    },
  },
  { timestamps: true }
);

const Product_Type = mongoose.models.Product_Type || model("Product_Type", productTypeSchema);
export default Product_Type;
