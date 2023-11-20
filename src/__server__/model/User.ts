import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      trim: true,
      type: String,
      required: [true, "First Name is required!"],
    },
    last_name: {
      trim: true,
      type: String,
      required: [true, "Last Name is required!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required!"],
    },
    termsAndCondition: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    phone: String,
    avatar: String,
    avatarKey: String,
    dateOfBirth: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || model("User", userSchema);
export default User;
