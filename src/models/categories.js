import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    supplier_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Supplier" },
    categoryName: { type: String, required: true, trim: true },
    image_url: { type: String },
    subCategory: [{ type: String }],
    created_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
