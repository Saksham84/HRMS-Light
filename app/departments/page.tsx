"use client";

import { useState } from "react";
import { PageHeader } from "@/app/components/PageHeader";
import { useHRMS } from "@/app/context/HRMSContext";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/components/ui/table";
import { Building2, Plus, Trash2 } from "lucide-react";
import { AddDepartmentModal } from "@/app/components/AddDepartmentModal";
import { DeleteDepartmentDialog } from "@/app/components/DeleteDepartmentDialog";
import { Department } from "@/app/types";
import { DepartmentsSkeleton } from "@/app/components/skeletons/DepartmentsSkeleton";

export default function DepartmentsPage() {
    const { departments, employees, loading } = useHRMS();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] =
        useState<Department | null>(null);

    const handleDeleteClick = (department: Department) => {
        setDepartmentToDelete(department);
        setDeleteDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Count employees per department
    const getDepartmentEmployeeCount = (departmentName: string) => {
        return employees.filter(
            (emp) => emp.department === departmentName
        ).length;
    };

    // Sort departments alphabetically
    const sortedDepartments = [...departments].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    if (loading) {
        return <DepartmentsSkeleton />;
    }
    return (
        <div className="page-content">
            <PageHeader
                title="Departments"
                description="Manage organizational departments"
                action={
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Department
                    </Button>
                }
            />

            <Card>
                <CardHeader>
                    <CardTitle>All Departments</CardTitle>
                </CardHeader>
                <CardContent>
                    {departments.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <Building2 className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">
                                No departments yet
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Get started by creating your first department
                            </p>
                            <Button onClick={() => setIsAddModalOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Department
                            </Button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Department Name</TableHead>
                                        <TableHead>Employees</TableHead>
                                        <TableHead>Created Date</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sortedDepartments.map((dept) => {
                                        const employeeCount =
                                            getDepartmentEmployeeCount(dept.name);

                                        return (
                                            <TableRow key={dept.id}>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center">
                                                        <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                                                        {dept.name}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {employeeCount}{" "}
                                                    {employeeCount === 1
                                                        ? "employee"
                                                        : "employees"}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {formatDate(dept.createdAt)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleDeleteClick(dept)
                                                        }
                                                        className="text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Delete
                                                        </span>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Modals */}
            <AddDepartmentModal
                open={isAddModalOpen}
                onOpenChange={setIsAddModalOpen}
            />

            <DeleteDepartmentDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                department={departmentToDelete}
            />
        </div>
    );
}
