import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Employee } from "@/models/Employee";
import { Attendance } from "@/models/Attendance";

/**
 * GET: Fetch all employees
 */
export async function GET() {
  try {
    await connectDB();
    const employees = await Employee.find().sort({ createdAt: -1 });
    return NextResponse.json(employees);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

/**
 * POST: Add new employee
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const employee = await Employee.create(body);
    return NextResponse.json(employee, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create employee" },
      { status: 400 }
    );
  }
}

/**
 * DELETE: Delete employee AND their attendance records
 */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const employeeId = searchParams.get("id");

    if (!employeeId) {
      return NextResponse.json(
        { message: "Employee ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    // 1️⃣ Delete employee
    const deletedEmployee = await Employee.findOneAndDelete({
      employeeId,
    });

    if (!deletedEmployee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Delete all attendance records of this employee
    await Attendance.deleteMany({ employeeId });

    return NextResponse.json({
      success: true,
      message: "Employee and related attendance deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to delete employee" },
      { status: 500 }
    );
  }
}
