import Product from "../../../../models/products";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        await connectMongoDB();
        const reqBody = await request.json();

        const {
            name,
            description,
            price,
            stock_quantity,
            image_url,
            discounted_price,
            unit,
            status
        } = reqBody;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid or missing Product ID" },
                { status: 400 }
            );
        }

        const updateFields = {
            name,
            description,
            price,
            stock_quantity,
            image_url,
            discounted_price,
            unit,
            status
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Product updated successfully", product: updatedProduct },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating product", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await connectMongoDB();

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid or missing Product ID" },
                { status: 400 }
            );
        }

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
