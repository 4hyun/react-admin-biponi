import mongoose, { model, Schema } from "mongoose";
import Category from "./Category";

const categoryNavListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    categories: [{ type: Schema.Types.ObjectId, ref: Category }],
  },
  { timestamps: true }
);

const Category_Nav_List =
  mongoose.models.Category_Nav_List || model("Category_Nav_List", categoryNavListSchema);
export default Category_Nav_List;
