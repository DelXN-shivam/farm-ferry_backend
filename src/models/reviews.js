// models/Review.js
const reviewSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
      required: true
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String
  }, { timestamps: true });

  const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
// module.exports = Supplier;
export default Review;