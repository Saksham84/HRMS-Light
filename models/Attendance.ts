import { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema(
  {
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ["present", "absent"], required: true },
  },
  { timestamps: true }
);

AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export const Attendance =
  models.Attendance || model("Attendance", AttendanceSchema);
