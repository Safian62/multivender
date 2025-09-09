const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: false, // 👈 ab optional ho gaya
      },
      name: { type: String, required: true },
      price: { type: Number, required: false }, // 👈 ab optional ho gaya
      qty: { type: Number, required: true },
      shopId: { type: String, required: true },
    },
  ],
  shippingAddress: { type: Object, required: true },
  user: { type: Object, required: true },
  totalPrice: { type: Number, required: true },
  orderStatus: { type: String, default: "Processing" },
  paymentInfo: {
    id: { type: String },
    status: { type: String },
    type: { type: String },
  },
  paidAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
