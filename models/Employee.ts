import { Schema, model, models } from "mongoose";

const EmployeeSchema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

export const Employee =
  models.Employee || model("Employee", EmployeeSchema);
