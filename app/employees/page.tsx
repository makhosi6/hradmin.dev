"use client";
import React from "react";
import { Card, CardBody, Breadcrumbs } from "@/app/theme";
import FilterCard from "../components/EmployeesFilterCard";
import { EmployeesTable } from "../components/EmployeesTable";
import Link from "next/link";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";

export default function Employees() {
  return (

      <div className="flex flex-col gap-6 m-auto py-5 max-w-3xl w-full">
        <PageBreadcrumbs />
        <FilterCard />
        <EmployeesTable />
      </div>
  
  );
}


