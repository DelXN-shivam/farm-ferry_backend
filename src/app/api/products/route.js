import Product from "../../../models/products";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        await connectMongoDB();
        const reqBody = await request.json();

        const { supplier_id, category_id, name, description, price, stock_quantity, image_url, discounted_price, unit, status, review_id } = reqBody;

        if (!supplier_id || !category_id || !name || !price || !stock_quantity || !discounted_price) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const supplierObjectId = new mongoose.Types.ObjectId(supplier_id);
        const categoryObjectId = new mongoose.Types.ObjectId(category_id);
        const reviewObjectId = review_id ? new mongoose.Types.ObjectId(review_id) : null;

        const newProduct = new Product({
            supplier_id: supplierObjectId,
            category_id: categoryObjectId,
            name,
            description,
            price,
            stock_quantity,
            image_url,
            discounted_price,
            unit,
            status,
            review_id: reviewObjectId,
        });

        await newProduct.save();

        return NextResponse.json(
            { message: "Product created successfully", product: newProduct },
            { status: 201 }
        );
    } catch (error) {
        let errorMessage = error.message;
        return NextResponse.json(
            { message: "Error creating product", error: errorMessage },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const products = await Product.find({});
        return NextResponse.json({ success: true, products }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid or missing Product ID" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting product", error: error.message },
            { status: 500 }
        );
    }
}
