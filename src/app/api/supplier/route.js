import Supplier from "../../../models/supplier";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import bcrypt from "bcryptjs";

// export async function GET(request) {
//     await connectMongoDB();
//     const suppliers = await Supplier.find();
//     // return NextResponse.json({ suppliers });
//     return NextResponse.json({ message: "Suppliers fetched successfully", suppliers }, { status: 200 });
// }

export async function POST(request) {
    try {
        await connectMongoDB();
        const reqBody = await request.json();

        const {
            supplierName,
            supplierEmail,
            supplierPassword,
            supplierPhone,
            profile,
            products,
            product_categories,
            product_pricing,
            orders,
            order_tracking,
            payments,
            payment_methods,
            invoices,
            deliveries,
            delivery_tracking,
            sales_reports,
            order_trends,
            customer_reviews
        } = reqBody;

        const existingSupplier = await Supplier.findOne({
            $or: [{ supplierEmail }, { supplierPhone }]
        });

        if (existingSupplier) {
            return NextResponse.json(
                { message: "Supplier with this email or phone number already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(supplierPassword, 10);

        const newSupplier = new Supplier({
            supplierName,
            supplierEmail,
            supplierPassword: hashedPassword,
            supplierPhone,
            profile,
            products,
            product_categories,
            product_pricing,
            orders,
            order_tracking,
            payments,
            payment_methods,
            invoices,
            deliveries,
            delivery_tracking,
            sales_reports,
            order_trends,
            customer_reviews
        });

        // Save supplier to database
        await newSupplier.save();

        return NextResponse.json(
            {
                message: "Supplier created successfully",
                supplier: newSupplier
            },
            { status: 201 }
        );
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json(
                { message: "Duplicate entry: Email or Phone number already exists", error: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Error creating supplier", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const suppliers = await Supplier.find({});
        return NextResponse.json({ success: true, suppliers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const id = request.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json(
                { message: "Supplier ID is required" },
                { status: 400 }
            );
        }

        await connectMongoDB();
        await Supplier.findByIdAndDelete(id);
        return NextResponse.json({ message: "Supplier Deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting supplier", error: error.message },
            { status: 500 }
        );
    }
}