import Cart from "../../../models/cart";
import Customer from "../../../models/customer";
import Product from "../../../models/products";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        await connectMongoDB();
        const reqBody = await request.json();
        const { customer, items } = reqBody;

        if (!customer || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { message: "Customer ID and items are required" },
                { status: 400 }
            );
        }

        const customerObjectId = new mongoose.Types.ObjectId(customer);

        // Check if cart already exists for the customer
        let cart = await Cart.findOne({ customer: customerObjectId });

        if (cart) {
            // Update cart items
            items.forEach((newItem) => {
                const existingItem = cart.items.find(
                    (item) => item.product.toString() === newItem.product
                );
                if (existingItem) {
                    existingItem.quantity += newItem.quantity || 1;
                } else {
                    cart.items.push({
                        product: new mongoose.Types.ObjectId(newItem.product),
                        quantity: newItem.quantity || 1,
                        selected: newItem.selected || true,
                    });
                }
            });
        } else {
            // Create new cart
            cart = new Cart({
                customer: customerObjectId,
                items: items.map((item) => ({
                    product: new mongoose.Types.ObjectId(item.product),
                    quantity: item.quantity || 1,
                    selected: item.selected || true,
                })),
            });
        }

        await cart.save();

        return NextResponse.json(
            { message: "Cart updated successfully", cart },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating cart", error: error.message },
            { status: 500 }
        );
    }
}

// Get All Carts
export async function GET() {
    try {
        await connectMongoDB();
        const carts = await Cart.find({}).populate("customer").populate("items.product");
        return NextResponse.json({ success: true, carts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// Delete Entire Cart by Customer ID (Query Param)
export async function DELETE(request) {
    try {
        const customer = request.nextUrl.searchParams.get("customer");

        if (!customer || !mongoose.Types.ObjectId.isValid(customer)) {
            return NextResponse.json(
                { message: "Invalid or missing Customer ID" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        const deletedCart = await Cart.findOneAndDelete({ customer });

        if (!deletedCart) {
            return NextResponse.json(
                { message: "Cart not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Cart deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting cart", error: error.message },
            { status: 500 }
        );
    }
}
