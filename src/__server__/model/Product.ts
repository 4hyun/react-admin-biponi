import mongoose, { model, Schema } from "mongoose";

const skuSchema = new Schema({
  sku: { type: String, required: true },
  price: {
    base: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    discount: { type: Number, default: 0 },
  },
  quantity: { required: true, type: Number },
  image: [],
  color: { required: true, type: [String] },
  unit: { type: String },
});

const productSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
      index: "text",
    },
    features: {
      type: [String],
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      index: true,
    },
    skus: [skuSchema],
    description: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || model("Product", productSchema);
export default Product;
