"use client";

import Link from "next/link";

import { useEmployeesStore } from "./store/employees";
import { useDeptStore } from "./store/depts";
import { useUserStore } from "./store/current-user";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "./theme";

export default function Home() {
  const router = useRouter();
  const { setAllDept } = useDeptStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (currentUser) {
      /// get dept(s)
      setAllDept();
      ///
      router.push("/employees");
    } else {
      router.push("/login");
    }
  }, [currentUser, router, setAllDept]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex justify-center items-center h-screen">
          <Spinner className="h-16 w-16 text-gray-900/50" />;
        </div>
      </main>
    </>
  );
}
