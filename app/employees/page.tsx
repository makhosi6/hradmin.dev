"use client";
import React, { useState } from "react";
import { Card, CardBody, Breadcrumbs } from "@/app/theme";
import FilterCard from "../components/EmployeesFilterCard";
import { EmployeesTable } from "../components/EmployeesTable";
import Link from "next/link";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";
import { userEmployeeProfile } from "../api/data";
import { Dept, Status, UserEmployeeProfile } from "../global_types";
import { useDeptStore } from "../store/depts";
import { statusAsBool } from "../helpers";
import { useEmployeesStore } from "../store/employees";

export default function Employees() {
  const {employees} = useEmployeesStore()
  const [filteredEmployees, setFilteredEmployees] =
    useState<UserEmployeeProfile[]>(employees);
  const { getOne: getOneDept } = useDeptStore();

  
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

