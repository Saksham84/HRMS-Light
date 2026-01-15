import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Department } from "@/models/Department";

/**
 * GET: Fetch all departments
 */
export async function GET() {
  try {
    await connectDB();
    const departments = await Department.find().sort({ createdAt: -1 });
    return NextResponse.json(departments);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

/**
 * POST: Create new department
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { message: "Department name is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const department = await Department.create({
      name: body.name,
    });

    return NextResponse.json(department, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error.code === 11000
            ? "Department already exists"
            : error.message || "Failed to create department",
      },
      { status: 400 }
    );
  }
}

/**
 * DELETE: Delete department by id
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Department ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return NextResponse.json(
        { message: "Department not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete department" },
      { status: 500 }
    );
  }
}
