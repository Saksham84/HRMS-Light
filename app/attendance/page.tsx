"use client";
import { useState } from 'react';
import { PageHeader } from '@/app/components/PageHeader';
import { useHRMS } from '@/app/context/HRMSContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
    CardSkeleton,
    TableSkeleton,
} from "@/app/components/skeletons";

export default function AttendancePage() {
    const { employees, attendanceRecords, addAttendanceRecord, loading } = useHRMS();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mark Attendance Form State
    const [markFormData, setMarkFormData] = useState({
        employeeId: '',
        date: new Date().toISOString().split('T')[0],
        status: '' as 'present' | 'absent' | '',
    });
    const [markFormErrors, setMarkFormErrors] = useState({
        employeeId: '',
        status: '',
    });

    // Filter State
    const [filterDate, setFilterDate] = useState('');
    const [filterEmployee, setFilterEmployee] = useState('all');

    // Validate Mark Attendance Form
    const validateMarkForm = () => {
        const errors = {
            employeeId: '',
            status: '',
        };
        let isValid = true;

        if (!markFormData.employeeId) {
            errors.employeeId = 'Please select an employee';
            isValid = false;
        }

        if (!markFormData.status) {
            errors.status = 'Please select attendance status';
            isValid = false;
        }

        // Check if attendance already marked for this employee on this date
        const existingRecord = attendanceRecords.find(
            (record) =>
                record.employeeId === markFormData.employeeId &&
                record.date === markFormData.date
        );

        if (existingRecord) {
            errors.employeeId = 'Attendance already marked for this employee on this date';
            isValid = false;
        }

        setMarkFormErrors(errors);
        return isValid;
    };

    // Handle Mark Attendance Submit
    const handleMarkAttendance = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateMarkForm()) {
            return;
        }

        setIsSubmitting(true);

        const employee = employees.find((emp) => emp.id === markFormData.employeeId);
        if (!employee) {
            toast.error('Employee not found');
            setIsSubmitting(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            const newRecord = {
                id: `ATT${Date.now()}`,
                employeeId: markFormData.employeeId,
                employeeName: employee.fullName,
                date: markFormData.date,
                status: markFormData.status as "present" | "absent",
            };

            addAttendanceRecord(newRecord);
            toast.success('Attendance marked successfully!');

            // Reset form
            setMarkFormData({
                employeeId: '',
                date: new Date().toISOString().split('T')[0],
                status: '',
            });
            setIsSubmitting(false);
        }, 500);
    };

    // Filter Records
    const filteredRecords = attendanceRecords.filter((record) => {
        const matchesDate = !filterDate || record.date === filterDate;
        const matchesEmployee =
            filterEmployee === 'all' || record.employeeId === filterEmployee;
        return matchesDate && matchesEmployee;
    });

    // Sort records by date (newest first)
    const sortedRecords = [...filteredRecords].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calculate statistics per employee
    const employeeStats = employees.map((employee) => {
        const employeeRecords = attendanceRecords.filter(
            (record) => record.employeeId === employee.id
        );
        const presentCount = employeeRecords.filter(
            (record) => record.status === 'present'
        ).length;
        const totalCount = employeeRecords.length;

        return {
            ...employee,
            presentDays: presentCount,
            totalDays: totalCount,
        };
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="page-content">
            <PageHeader
                title="Attendance"
                description="Track and manage employee attendance"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {loading ? (
                    <>
                        <CardSkeleton />
                        <TableSkeleton columns={3} rows={5} />
                    </>
                ) : (
                    <>
                        {/* Mark Attendance Form */}
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="h-5 w-5 mr-2" />
                                    Mark Attendance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleMarkAttendance} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="employee">Employee</Label>
                                        <Select
                                            value={markFormData.employeeId}
                                            onValueChange={(value) => {
                                                setMarkFormData({ ...markFormData, employeeId: value });
                                                setMarkFormErrors({ ...markFormErrors, employeeId: '' });
                                            }}
                                        >
                                            <SelectTrigger
                                                className={markFormErrors.employeeId ? 'border-destructive' : ''}
                                            >
                                                <SelectValue placeholder="Select employee" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {employees.length === 0 ? (
                                                    <div className="p-2 text-sm text-muted-foreground text-center">
                                                        No employees found
                                                    </div>
                                                ) : (
                                                    employees.map((emp) => (
                                                        <SelectItem key={emp.id} value={emp.id}>
                                                            {emp.fullName} ({emp.id})
                                                        </SelectItem>
                                                    ))
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {markFormErrors.employeeId && (
                                            <p className="text-sm text-destructive">{markFormErrors.employeeId}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={markFormData.date}
                                            onChange={(e) =>
                                                setMarkFormData({ ...markFormData, date: e.target.value })
                                            }
                                            max={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={markFormData.status}
                                            onValueChange={(value: 'present' | 'absent') => {
                                                setMarkFormData({ ...markFormData, status: value });
                                                setMarkFormErrors({ ...markFormErrors, status: '' });
                                            }}
                                        >
                                            <SelectTrigger
                                                className={markFormErrors.status ? 'border-destructive' : ''}
                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="present">
                                                    <span className="flex items-center">
                                                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                                        Present
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="absent">
                                                    <span className="flex items-center">
                                                        <XCircle className="h-4 w-4 mr-2 text-red-600" />
                                                        Absent
                                                    </span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {markFormErrors.status && (
                                            <p className="text-sm text-destructive">{markFormErrors.status}</p>
                                        )}
                                    </div>

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? 'Marking...' : 'Mark Attendance'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Employee Statistics */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Attendance Statistics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {employees.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-sm text-muted-foreground">
                                            No employees found. Add employees to track attendance.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Employee</TableHead>
                                                    <TableHead>Department</TableHead>
                                                    <TableHead className="text-right">Present Days</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {employeeStats.map((emp) => (
                                                    <TableRow key={emp.id}>
                                                        <TableCell className="font-medium">{emp.fullName}</TableCell>
                                                        <TableCell className="text-muted-foreground">
                                                            {emp.department}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <span className="font-medium text-green-600">
                                                                {emp.presentDays}
                                                            </span>
                                                            <span className="text-muted-foreground"> / {emp.totalDays}</span>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Attendance Records */}
            {loading ? (
                <TableSkeleton columns={4} rows={6} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Records</CardTitle>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="filterDate">Filter by Date</Label>
                                <Input
                                    id="filterDate"
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    placeholder="All dates"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="filterEmployee">Filter by Employee</Label>
                                <Select value={filterEmployee} onValueChange={setFilterEmployee}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All employees" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All employees</SelectItem>
                                        {employees.map((emp) => (
                                            <SelectItem key={emp.id} value={emp.id}>
                                                {emp.fullName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {attendanceRecords.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                    <Calendar className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    No attendance records yet
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Start marking attendance to see records here
                                </p>
                            </div>
                        ) : sortedRecords.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                                    <Calendar className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    No records found
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Try adjusting your filters
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Employee</TableHead>
                                            <TableHead>Employee ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedRecords.map((record) => (
                                            <TableRow key={record.id}>
                                                <TableCell className="font-medium">
                                                    {record.employeeName}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {record.employeeId}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {formatDate(record.date)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={record.status === 'present' ? 'default' : 'destructive'}
                                                        className={
                                                            record.status === 'present'
                                                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                                                : ''
                                                        }
                                                    >
                                                        {record.status === 'present' ? (
                                                            <>
                                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                                Present
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle className="h-3 w-3 mr-1" />
                                                                Absent
                                                            </>
                                                        )}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}