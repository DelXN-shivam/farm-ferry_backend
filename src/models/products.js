import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    supplier_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Supplier" },
    category_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock_quantity: { type: Number, required: true, min: 0 },
    quantity:{type: Number, required: true, min: 0},
    price_per_quantity:{type: Number, required: true, min: 0},


    image_url: [{ type: String }],
    active:{ type: Boolean, default: true },
    discounted_price: { type: Number, required: true, min: 0 },
    offer_percentage: {
      type: Number,
      default: function () {
        return this.price > 0
          ? ((this.price - this.discounted_price) / this.price) * 100
          : 0;
      },
    },
    unit: { type: String, enum: ["kg", "liters", "pcs", "box", "dozen"], default: "kg" },
    status: { type: Boolean, default: true }, // true = Available, false = Out of Stock
    review_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Reviews" },
    created_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Middleware to auto-calculate `offer_percentage` before saving
productSchema.pre("save", function (next) {
  if (this.price > 0) {
    this.offer_percentage = ((this.price - this.discounted_price) / this.price) * 100;
  } else {
    this.offer_percentage = 0;
  }
  next();
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;