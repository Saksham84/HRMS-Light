import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Attendance } from "@/models/Attendance";

export async function GET() {
  await connectDB();
  const records = await Attendance.find().sort({ date: -1 });
  return NextResponse.json(records);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();

    const record = await Attendance.create(body);
    return NextResponse.json(record, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }
}
