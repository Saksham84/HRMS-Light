"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/app/components/ui/alert-dialog";
import { useHRMS } from "@/app/context/HRMSContext";
import { Department } from "@/app/types";
import { toast } from "sonner";

interface DeleteDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: Department | null;
}

export function DeleteDepartmentDialog({
  open,
  onOpenChange,
  department,
}: DeleteDepartmentDialogProps) {
  const { deleteDepartment, employees } = useHRMS();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!department) return null;

  const employeesInDepartment = employees.filter(
    (emp) => emp.department === department.name
  ).length;

  const handleDelete = async () => {
    if (employeesInDepartment > 0) {
      toast.error(
        "Cannot delete department while employees are assigned to it"
      );
      return;
    }

    try {
      setIsDeleting(true);
      await deleteDepartment(department.id);
      toast.success("Department deleted successfully!");
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete department");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Department</AlertDialogTitle>

          {/* ✅ asChild prevents Radix from rendering <p> */}
          <AlertDialogDescription asChild>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                Are you sure you want to delete{" "}
                <strong>{department.name}</strong>?
              </div>

              {employeesInDepartment > 0 && (
                <div className="text-amber-600 dark:text-amber-500 font-medium">
                  ⚠️ {employeesInDepartment} employee
                  {employeesInDepartment !== 1 ? "s are" : " is"} currently
                  assigned to this department. Please reassign them before
                  deleting.
                </div>
              )}

              <div>This action cannot be undone.</div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting || employeesInDepartment > 0}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
