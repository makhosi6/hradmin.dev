"use client";
import React, { useEffect, useState } from "react";
import FilterCard from "../_components/EmployeesFilterCard";
import { EmployeesTable } from "../_components/EmployeesTable";
import { PageBreadcrumbs } from "../_components/PageBreadcrumbs";
import { UserEmployeeProfile } from "../_lib/global_types";
import { useDeptStore } from "../_store/depts";
import { statusAsBool } from "../_lib/helpers";
import { useEmployeesStore } from "../_store/employees";

export default function Employees() {
  const { employees } = useEmployeesStore();
  const [filteredEmployees, setFilteredEmployees] =
    useState<UserEmployeeProfile[]>(employees);
  const { getOne: getOneDept } = useDeptStore();

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  return (
    <div className="flex flex-col gap-6 m-auto py-5 max-w-3xl w-full mb-5">
      <PageBreadcrumbs paths={["Employees"]} />
      <FilterCard
        filter={(data) =>
          setFilteredEmployees(
            data === null
              ? employees
              : employees.filter((empl) => {
                  const selectedStatus = statusAsBool(data.status);
                  const condition1 = empl.employee_details.department.includes(
                    data.department
                  );
                  const condition2 =
                    empl.employee_details.isActive == selectedStatus;

                  return condition1 || condition2;
                })
          )
        }
      />
      <EmployeesTable
        employeesList={filteredEmployees}
        getOneDept={getOneDept}
      />
    </div>
  );
}
