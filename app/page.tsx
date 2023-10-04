import { IconButton } from "@/app/theme";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import MenuButton from "./components/MenuButton";

export default function Home() {
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
        <code>{process.env.APP_HOST} - HOST </code>
      </main>
    </>
  );
}
