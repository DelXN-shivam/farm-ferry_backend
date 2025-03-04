import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_id: { type: mongoose.Schema.Types.UUID, default: () => crypto.randomUUID(), unique: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    supplier_id: { type: mongoose.Schema.Types.UUID, required: true, ref: "Supplier" },
    products: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }, // Price per unit at order time
        discounted_price: { type: Number, required: true, min: 0 }, // Final price after discount
        total_price: {
          type: Number,
          default: function () {
            return this.quantity * this.discounted_price;
          },
        },
      },
    ],
    total_amount: {
      type: Number,
      default: function () {
        return this.products.reduce((sum, item) => sum + item.total_price, 0);
      },
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    order_status: {
      type: String,
      enum: ["pending", "processing", "out_for_delivery", "delivered", "cancelled", "returned"],
      default: "pending",
    },
    delivery_address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip_code: { type: String, required: true },
      country: { type: String, required: true },
      contact_number: { type: String, required: true },
    },
    delivery_boy: {
      delivery_boy_id: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryBoy" },
      assigned_at: { type: Date },
      status: {
        type: String,
        enum: ["assigned", "picked_up", "on_the_way", "delivered", "failed"],
        default: "assigned",
      },
    },
    estimated_delivery_date: { type: Date },
    delivered_at: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically manages createdAt & updatedAt
  }
);

// Middleware to auto-calculate total amount before saving
orderSchema.pre("save", function (next) {
  this.total_amount = this.products.reduce((sum, item) => sum + item.total_price, 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
