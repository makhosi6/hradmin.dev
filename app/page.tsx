import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <Link key={1} href={`/login`}>Login</Link>
      <Link key={1} href={`/departments`}>Departments</Link>
      <Link key={3} href={`/departments/2`}>Department 2</Link>
      <Link key={1} href={`/employees`}>Employees</Link>
      <Link key={3} href={`/employees/3`}>Employee 3</Link>
   </div>
    </main>  )
}

