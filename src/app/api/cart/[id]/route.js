import Cart from "../../../../models/cart";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Get Cart by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid or missing Cart ID" },
                { status: 400 }
            );
        }

        const cart = await Cart.findById(id).populate("customer").populate("items.product");

        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// Update Cart by ID (Modify Items)
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();
        const reqBody = await request.json();

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid or missing Cart ID" },
                { status: 400 }
            );
        }

        const { items } = reqBody;

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { message: "Items array is required" },
                { status: 400 }
            );
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            { items },
            { new: true }
        );

        if (!updatedCart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Cart updated successfully", cart: updatedCart },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating cart", error: error.message },
            { status: 500 }
        );
    }
}

// Delete Cart by ID
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid or missing Cart ID" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        const deletedCart = await Cart.findByIdAndDelete(id);

        if (!deletedCart) {
            return NextResponse.json(
                { message: "Cart not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Cart deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting cart", error: error.message },
            { status: 500 }
        );
    }
}
