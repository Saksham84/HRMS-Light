export interface Employee {
  id: string;
  fullName: string;
  email: string;
  department: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  status: 'present' | 'absent';
}
export interface Department {
  id: string;
  name: string;
  createdAt: string;
}
