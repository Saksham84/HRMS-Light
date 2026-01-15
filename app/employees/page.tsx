"use client";
import { useState } from 'react';
import { PageHeader } from '@/app/components/PageHeader';
import { useHRMS } from '@/app/context/HRMSContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent } from '@/app/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/app/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/app/components/ui/alert-dialog';
import { Label } from '@/app/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';
import { Plus, Search, Trash2, Users } from 'lucide-react';
// import { DEPARTMENTS } from '@/app/types';
import { toast } from 'sonner';
import {
    SearchBarSkeleton,
    TableSkeleton,
    CardSkeleton,
} from "@/app/components/skeletons";

export default function EmployeesPage() {
    const { employees, departments, addEmployee, deleteEmployee, loading } = useHRMS();
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        id: '',
        fullName: '',
        email: '',
        department: '',
    });
    const [formErrors, setFormErrors] = useState({
        id: '',
        fullName: '',
        email: '',
        department: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter employees based on search
    const filteredEmployees = employees.filter((emp) => {
        const query = searchQuery.toLowerCase();
        return (
            emp.id.toLowerCase().includes(query) ||
            emp.fullName.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query) ||
            emp.department.toLowerCase().includes(query)
        );
    });

    // Validation
    const validateForm = () => {
        const errors = {
            id: '',
            fullName: '',
            email: '',
            department: '',
        };
        let isValid = true;

        if (!formData.id.trim()) {
            errors.id = 'Employee ID is required';
            isValid = false;
        } else if (employees.some((emp) => emp.id === formData.id)) {
            errors.id = 'This Employee ID already exists';
            isValid = false;
        }

        if (!formData.fullName.trim()) {
            errors.fullName = 'Full name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        } else if (employees.some((emp) => emp.email === formData.email)) {
            errors.email = 'This email is already registered';
            isValid = false;
        }

        if (!formData.department) {
            errors.department = 'Department is required';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            addEmployee(formData);
            toast.success('Employee added successfully!');
            setIsAddModalOpen(false);
            resetForm();
            setIsSubmitting(false);
        }, 500);
    };

    const resetForm = () => {
        setFormData({
            id: '',
            fullName: '',
            email: '',
            department: '',
        });
        setFormErrors({
            id: '',
            fullName: '',
            email: '',
            department: '',
        });
    };

    const handleDelete = (id: string) => {
        deleteEmployee(id);
        toast.success('Employee deleted successfully!');
        setDeleteConfirmId(null);
    };

    return (
        <div className="page-content">
            <PageHeader
                title="Employees"
                description="Manage your employee records"
                action={
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Employee
                    </Button>
                }
            />

            {/* Search Bar */}
            {loading ? (
                <SearchBarSkeleton />
            ) : (
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by ID, name, email, or department..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Employee Table */}
            <Card>
                <CardContent className="p-0">
                    {employees.length === 0 ? (
                        <div className="text-center py-12 px-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                No employees yet
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Get started by adding your first employee
                            </p>
                            <Button onClick={() => setIsAddModalOpen(true)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Employee
                            </Button>
                        </div>
                    ) : filteredEmployees.length === 0 ? (
                        <div className="text-center py-12 px-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground mb-2">
                                No results found
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Try adjusting your search query
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee ID</TableHead>
                                        <TableHead>Full Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredEmployees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">{employee.id}</TableCell>
                                            <TableCell>{employee.fullName}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {employee.email}
                                            </TableCell>
                                            <TableCell>{employee.department}</TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteConfirmId(employee.id)}
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add Employee Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add New Employee</DialogTitle>
                        <DialogDescription>
                            Enter the employee details below. All fields are required.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="id">Employee ID</Label>
                                <Input
                                    id="id"
                                    placeholder="e.g., EMP001"
                                    value={formData.id}
                                    onChange={(e) => {
                                        setFormData({ ...formData, id: e.target.value });
                                        setFormErrors({ ...formErrors, id: '' });
                                    }}
                                    className={formErrors.id ? 'border-destructive' : ''}
                                />
                                {formErrors.id && (
                                    <p className="text-sm text-destructive">{formErrors.id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="e.g., John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => {
                                        setFormData({ ...formData, fullName: e.target.value });
                                        setFormErrors({ ...formErrors, fullName: '' });
                                    }}
                                    className={formErrors.fullName ? 'border-destructive' : ''}
                                />
                                {formErrors.fullName && (
                                    <p className="text-sm text-destructive">{formErrors.fullName}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="e.g., john.doe@company.com"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                        setFormErrors({ ...formErrors, email: '' });
                                    }}
                                    className={formErrors.email ? 'border-destructive' : ''}
                                />
                                {formErrors.email && (
                                    <p className="text-sm text-destructive">{formErrors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select
                                    value={formData.department}
                                    onValueChange={(value) => {
                                        setFormData({ ...formData, department: value });
                                        setFormErrors({ ...formErrors, department: '' });
                                    }}
                                >
                                    <SelectTrigger className={formErrors.department ? 'border-destructive' : ''}>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map((dept) => (
                                            <SelectItem key={dept.id} value={dept.name}>
                                                {dept.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {formErrors.department && (
                                    <p className="text-sm text-destructive">{formErrors.department}</p>
                                )}
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    resetForm();
                                }}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding...' : 'Add Employee'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={deleteConfirmId !== null}
                onOpenChange={() => setDeleteConfirmId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete this employee record. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}