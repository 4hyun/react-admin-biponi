import { model, models, Schema } from "mongoose";

const settingsSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: "text",
  },
  values: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const Settings = models.Settings || model("Settings", settingsSchema);
export default Settings;
