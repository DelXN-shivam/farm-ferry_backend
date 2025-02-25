import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
    {
        supplier_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        supplierName: { type: String, required: true, trim: true },
        supplierEmail: { type: String, required: true, unique: true, lowercase: true },
        supplierPassword: { type: String, required: true }, // Should be hashed
        supplierPhone: { type: String, required: true, unique: true },
        supplierCreated_at: { type: Date, default: Date.now },

        // Supplier Profile
        profile: {
            supplierBusiness_type: { type: String, required: true },
            supplierShop_name: { type: String, required: true },
            supplierLocation: { type: String, required: true },
            supplierContact_number: { type: String, required: true },
            supplierKyc_document: { type: String }, // URL or file path
            supplierLicense: { type: String },
            supplierGst_number: { type: String },
            supplierStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
            supplierVerified_at: { type: Date },
            supplierUpdated_at: { type: Date, default: Date.now },
        },

        // Products
        products: [
            {
                product_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
                productName: { type: String, required: true },
                productCategory: { type: String, required: true },
                productImage: { type: String }, // URL or file path
                productPrice: { type: Number, required: true },
                productStock: { type: Number, required: true },
                productCreated_at: { type: Date, default: Date.now },
                productLast_updated: { type: Date, default: Date.now },
            },
        ],

        // Product Categories
        product_categories: [{ categoryName: { type: String, unique: true, required: true } }],

        // Product Pricing
        product_pricing: [
            {
                product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                productDiscount: { type: Number, required: true }, // Percentage
                productFinal_price: { type: Number, required: true },
                productValid_from: { type: Date, required: true },
                productValid_to: { type: Date, required: true },
            },
        ],

        // Orders
        orders: [
            {
                order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
                customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
                orderStatus: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"], default: "pending" },
                orderCreated_at: { type: Date, default: Date.now },
            },
        ],

        // Order Tracking
        order_tracking: [
            {
                order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
                order_trackingStatus: { type: String, required: true },
                updated_at: { type: Date, default: Date.now },
            },
        ],

        // Supplier Payments
        payments: [
            {
                amount: { type: Number, required: true },
                payment_date: { type: Date, default: Date.now },
                paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
                commission_rate: { type: Number, required: true }, // Percentage
            },
        ],

        // Payment Methods
        payment_methods: [
            {
                method: { type: String, required: true },
                details: { type: String },
            },
        ],

        // Invoices
        invoices: [
            {
                amount: { type: Number, required: true },
                issued_at: { type: Date, default: Date.now },
            },
        ],

        // Deliveries
        deliveries: [
            {
                order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
                delivery_partner_id: { type: mongoose.Schema.Types.ObjectId, ref: "DeliveryBoy" },
                deliveryStatus: { type: String, enum: ["pending", "dispatched", "delivered", "failed"], default: "pending" },
                expected_delivery: { type: Date, required: true },
            },
        ],

        // Delivery Tracking
        delivery_tracking: [
            {
                order_id: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
                latitude: { type: Number, required: true },
                longitude: { type: Number, required: true },
                updated_at: { type: Date, default: Date.now },
            },
        ],

        // Sales Reports
        sales_reports: [
            {
                total_sales: { type: Number, required: true },
                report_date: { type: Date, default: Date.now },
            },
        ],

        // Order Trends
        order_trends: [
            {
                product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                trend_score: { type: Number, required: true },
                analyzed_at: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
// module.exports = Supplier;
export default Supplier;