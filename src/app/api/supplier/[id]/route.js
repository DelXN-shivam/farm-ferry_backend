import Supplier from "../../../../models/supplier";
import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
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

        let updateFields = {
            supplierName,
            supplierEmail,
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
        };

        if (supplierPassword) {
            updateFields.supplierPassword = await bcrypt.hash(supplierPassword, 10);
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(id, updateFields, { new: false });

        if (!updatedSupplier) {
            return NextResponse.json({ message: "Supplier not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Supplier updated successfully", supplier: updatedSupplier },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating supplier", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await connectMongoDB();
        const supplier = await Supplier.findOne({ _id: id });
        return NextResponse.json({ success: true, supplier }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}