"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Employee, AttendanceRecord } from "@/app/types";

interface HRMSContextType {
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  loading: boolean;
  addEmployee: (employee: Employee) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  addAttendanceRecord: (record: AttendanceRecord) => Promise<void>;
  refreshData: () => Promise<void>;
}

const HRMSContext = createContext<HRMSContextType | undefined>(undefined);

export function HRMSProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */

  const fetchEmployees = async () => {
    const res = await fetch("/api/employees");
    if (!res.ok) throw new Error("Failed to fetch employees");
    const data = await res.json();
    setEmployees(
      data.map((emp: any) => ({
        id: emp.employeeId,
        fullName: emp.fullName,
        email: emp.email,
        department: emp.department,
      }))
    );

  };

  const fetchAttendance = async () => {
    const res = await fetch("/api/attendance");
    if (!res.ok) throw new Error("Failed to fetch attendance");
    const data = await res.json();
    setAttendanceRecords(
      data.map((rec: any) => ({
        id: rec._id,
        employeeId: rec.employeeId,
        employeeName: rec.employeeName,
        date: rec.date,
        status: rec.status,
      }))
    );

  };

  const refreshData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchEmployees(), fetchAttendance()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  /* ---------------- MUTATIONS ---------------- */

  const addEmployee = async (employee: Employee) => {
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employeeId: employee.id,
        fullName: employee.fullName,
        email: employee.email,
        department: employee.department,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to add employee");
    }

    await fetchEmployees();
  };

  const deleteEmployee = async (id: string) => {
    const res = await fetch(`/api/employees?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete employee");
    }

    await Promise.all([fetchEmployees(), fetchAttendance()]);
  };

  const addAttendanceRecord = async (record: AttendanceRecord) => {
    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to mark attendance");
    }

    await fetchAttendance();
  };

  return (
    <HRMSContext.Provider
      value={{
        employees,
        attendanceRecords,
        loading,
        addEmployee,
        deleteEmployee,
        addAttendanceRecord,
        refreshData,
      }}
    >
      {children}
    </HRMSContext.Provider>
  );
}

export function useHRMS() {
  const context = useContext(HRMSContext);
  if (!context) {
    throw new Error("useHRMS must be used within HRMSProvider");
  }
  return context;
}
