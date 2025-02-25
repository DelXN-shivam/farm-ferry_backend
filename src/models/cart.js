import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        unique: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        selected: {
            type: Boolean,
            default: true
        }
    }]
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart;