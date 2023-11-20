import mongoose, { model, Schema } from "mongoose";
import Payment from "./Payment";
import Product from "./Product";
import User from "./User";

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: Payment,
    },
    paymentStatus: { type: String },
    paymentType: { type: String },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Delivered", "Cancelled"],
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: Product, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        img: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    expectedDeliveryDate: { type: String },
    expectedDeliveryTime: { type: String },
    discount: { type: Number, default: 0 },
    preTaxTotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || model("Order", orderSchema);
export default Order;
