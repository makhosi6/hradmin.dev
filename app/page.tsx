"use client";


import Link from "next/link";

import { useEmployeesStore } from "./store/employees";
import { useDeptStore } from "./store/depts";
import { useUserStore } from "./store/current-user";

export default function Home() {

  const {employees} = useEmployeesStore()
  const {departments} = useDeptStore()
  const {currentUser}= useUserStore()
  return (
    <>

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <Link key={1} href={`/login`}>
            Login
          </Link>
          <Link key={2} href={`/departments`}>
            Departments
          </Link>
          <Link key={3} href={`/departments/2`}>
            Department 2
          </Link>
          <Link key={4} href={`/employees`}>
            Employees
          </Link>
          <Link key={5} href={`/employees/3`}>
            Employee 3
          </Link>
        </div>
        {/* <code>{process.env.APP_HOST} - HOST </code> */}
      </main>
    </>
  );
}
