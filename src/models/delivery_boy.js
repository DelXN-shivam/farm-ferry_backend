import mongoose from "mongoose";

const deliveryBoySchema = new mongoose.Schema(
  {
    delivery_boy_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, sparse: true, lowercase: true },
    phone_number: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Should be hashed
    profile_picture: { type: String }, // URL of profile image
    address: { type: String },
    city: { type: String },
    vehicle_type: { type: String, enum: ["bike", "scooter", "van", "truck"], required: true },
    vehicle_number: { type: String, required: true, unique: true },
    license_number: { type: String, required: true, unique: true },

    // OTP Verification
    otp_code: { type: String },
    otp_expiry: { type: Date },
    is_verified: { type: Boolean, default: false },
    is_used: { type: Boolean, default: false },

    // Delivery Boy Status
    status: { type: String, enum: ["available", "on_delivery", "inactive"], default: "available" },
    current_location: { latitude: { type: Number }, longitude: { type: Number } },

    // Orders Assigned to Delivery Boy
    assigned_orders: [
      {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        assigned_date: { type: Date, default: Date.now },
        delivery_status: {
          type: String,
          enum: ["assigned", "picked_up", "on_the_way", "delivered", "failed"],
          default: "assigned",
        },
        delivery_address: { type: String, required: true },
        delivery_time: { type: Date },
        payment_status: { type: String, enum: ["pending", "paid", "failed", "COD"], default: "pending" },
        cod_amount: { type: Number, default: 0 },
        proof_of_delivery: { type: String }, // Image or signature proof
      },
    ],

    // Earnings Information
    earnings: {
      total_deliveries: { type: Number, default: 0 },
      total_earnings: { type: Number, default: 0 },
      payout_requested: { type: Boolean, default: false },
      payout_status: { type: String, enum: ["pending", "approved", "completed"], default: "pending" },
      payout_date: { type: Date },
    },

    // Reviews & Ratings
    reviews: [
      {
        order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        rating: { type: Number, required: true, min: 1, max: 5 },
        review_comment: { type: String, trim: true },
        response: { type: String, trim: true }, // Optional response from delivery boy
        created_at: { type: Date, default: Date.now },
      },
    ],

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const DeliveryBoy = mongoose.model("DeliveryBoy", deliveryBoySchema);
module.exports = DeliveryBoy;
