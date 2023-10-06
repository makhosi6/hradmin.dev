"use client";

import React, { useEffect, useState } from "react";
import { DeptTable } from "../components/DeptTable";
import DeptFilterCard from "../components/DeptFilterCard";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { useDeptStore } from "../store/depts";
import { Dept, UserEmployeeProfile } from "../global_types";
import { useEmployeesStore } from "../store/employees";

export default function Departments() {
  const { departments } = useDeptStore();
  const [filteredDept, setFilteredDept] = useState<Dept[]>(departments);
  const { getAllEmployeesByEmployeesRole } = useEmployeesStore();
  const [managers, setManagers] = useState<UserEmployeeProfile[]>([]);

  useEffect(() => {
    getAllEmployeesByEmployeesRole("manager")
      .then(setManagers)
      .catch(console.warn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <div className="flex flex-col gap-6 m-auto py-5 max-w-3xl w-full mb-5">
      <PageBreadcrumbs paths={["Departments"]} />
      <DeptFilterCard
        filter={(data) => {
          const filtered = departments.filter(
            (_dept) => _dept.status.toLowerCase() == data?.status
          );
          const output = filtered.length > 0 ? filtered : departments;
          setFilteredDept(output);
        }}
      />
      <DeptTable managers={managers} filteredDeptList={filteredDept.length >0 ?filteredDept: departments} />
    </div>
  );
}
