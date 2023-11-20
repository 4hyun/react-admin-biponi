import mongoose, { model, Schema } from "mongoose";

const pageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// create text indexing
pageSchema.index({ slug: "text" });

const Page = mongoose.models.Page || model("Page", pageSchema);
export default Page;
