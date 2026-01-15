import { Schema, model, models } from "mongoose";

const DepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Department =
  models.Department || model("Department", DepartmentSchema);
