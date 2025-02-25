import Category from "../../../models/categories";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import mongoose from "mongoose";

export async function POST(request) {
    try {
        await connectMongoDB();
        const reqBody = await request.json();

        const { supplier_id, categoryName, image_url, subCategory } = reqBody;

        if (!supplier_id || !categoryName) {
            return NextResponse.json(
                { message: "Supplier ID and category name are required" },
                { status: 400 }
            );
        }

        // Convert supplier_id to ObjectId
        const supplierObjectId = new mongoose.Types.ObjectId(supplier_id);

        const newCategory = new Category({
            supplier_id: supplierObjectId,
            categoryName,
            image_url,
            subCategory,
        });

        await newCategory.save();

        return NextResponse.json(
            { message: "Category created successfully", category: newCategory },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error creating category", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const categories = await Category.find({});
        return NextResponse.json({ success: true, categories }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json(
                { message: "Category ID is required" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        await Category.findByIdAndDelete(id);
        return NextResponse.json({ message: "Category Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting category", error: error.message },
            { status: 500 }
        );
    }
}
