import mongoose, { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.models.Category || model("Category", categorySchema);
export default Category;
