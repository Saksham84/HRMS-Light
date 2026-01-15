"use client";
import { PageHeader } from '@/app/components/PageHeader';
import { StatsCard } from '@/app/components/StatsCard';
import { useHRMS } from '@/app/context/HRMSContext';
import { Users, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';

export default function DashboardPage() {
  const { employees, attendanceRecords } = useHRMS();

  // Get today's date string
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const todayString = getTodayString();

  // Calculate today's statistics
  const todayRecords = attendanceRecords.filter((record) => record.date === todayString);
  const presentCount = todayRecords.filter((record) => record.status === 'present').length;
  const absentCount = todayRecords.filter((record) => record.status === 'absent').length;

  // Get recent attendance records (last 10)
  const recentRecords = [...attendanceRecords]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

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
        title="Dashboard"
        description={`Welcome back! Today is ${formatDate(todayString)}`}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Employees"
          value={employees.length}
          icon={Users}
          color="primary"
        />
        <StatsCard
          title="Present Today"
          value={presentCount}
          icon={CheckCircle}
          color="success"
        />
        <StatsCard
          title="Absent Today"
          value={absentCount}
          icon={XCircle}
          color="destructive"
        />
      </div>

      {/* Attendance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          {recentRecords.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <CheckCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No attendance records yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Start marking attendance to see records here
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.employeeName}</TableCell>
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
                          {record.status === 'present' ? 'Present' : 'Absent'}
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
    </div>
  );
}