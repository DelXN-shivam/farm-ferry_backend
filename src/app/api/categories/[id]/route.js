import Category from "../../../../models/categories";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();
        const reqBody = await request.json();

        const { categoryName, image_url, subCategory } = reqBody;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid or missing Category ID" },
                { status: 400 }
            );
        }

        const updateFields = { categoryName, image_url, subCategory };

        const updatedCategory = await Category.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedCategory) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Category updated successfully", category: updatedCategory },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating category", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;
        await connectMongoDB();

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { message: "Invalid or missing Category ID" },
                { status: 400 }
            );
        }

        const category = await Category.findById(id);

        if (!category) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, category }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
