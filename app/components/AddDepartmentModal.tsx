"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useHRMS } from "@/app/context/HRMSContext";
import { toast } from "sonner";

interface AddDepartmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddDepartmentModal({
  open,
  onOpenChange,
}: AddDepartmentModalProps) {
  const { departments, addDepartment } = useHRMS();

  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = departmentName.trim();

    // Required validation
    if (!trimmedName) {
      setError("Department name is required");
      return;
    }

    // Duplicate check (case-insensitive)
    const isDuplicate = departments.some(
      (dept) => dept.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setError("A department with this name already exists");
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ CORRECT: pass only string
      await addDepartment(trimmedName);

      toast.success("Department added successfully!");

      // Reset & close
      setDepartmentName("");
      setError("");
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to add department");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setDepartmentName("");
      setError("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Department</DialogTitle>
          <DialogDescription>
            Create a new department for your organization.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="departmentName">Department Name</Label>
              <Input
                id="departmentName"
                placeholder="e.g., Engineering"
                value={departmentName}
                onChange={(e) => {
                  setDepartmentName(e.target.value);
                  setError("");
                }}
                className={error ? "border-destructive" : ""}
                disabled={isSubmitting}
                autoFocus
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
