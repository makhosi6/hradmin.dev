import React from "react";
import { DeptTable } from "../components/DeptTable";
import DeptFilterCard from "../components/DeptFilterCard";
import { PageBreadcrumbs } from "../components/PageBreadcrumbs";

export default function Departments() {
  return (
    <div className="flex flex-col gap-6 m-auto py-5 max-w-3xl w-full">
      <PageBreadcrumbs />
      <DeptFilterCard/>
      <DeptTable/>
    </div>
  );
}
