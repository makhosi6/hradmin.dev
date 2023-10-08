"use client";
import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
  Typography,
} from "../_lib/theme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Bars3Icon, InformationCircleIcon } from "@heroicons/react/24/solid";
import styles from "../_styles/MenuButton.module.css";
import Link from "next/link";
import { useUserStore } from "../_store/current-user";
import { useDeptStore } from "../_store/depts";
import { useEmployeesStore } from "../_store/employees";

export default function MenuButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showMenu, setShowMenu] = useState(true);
  const { logOut, isLoadingData } = useUserStore();
  const { setAllDept } = useDeptStore();
  const { currentUser } = useUserStore();
  const { getAllEmployeesByEmployeesManagerId, getAllEmployees, addEmployee } =
    useEmployeesStore();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    setShowMenu(!url.includes("login"));
    if (currentUser) {
      if (url.startsWith("/?") || url.includes("login"))
        router.push("/employees");
    } else {
      router.push("/login");
    }
  }, [currentUser, pathname, router, searchParams]);

  useEffect(() => {
    if (currentUser?.role == "manager") {
      getAllEmployeesByEmployeesManagerId(`${currentUser?.userId}`);
    } else if (currentUser?.role == "admin") {
      getAllEmployees();
    } else {
      if (currentUser) addEmployee(currentUser);
    }
    setAllDept();
  }, [
    setAllDept,
    currentUser,
    getAllEmployeesByEmployeesManagerId,
    getAllEmployees,
    addEmployee,
  ]);

  return (
    <div className={styles.menu}>
      
      {showMenu && (
        <Menu>
          <MenuHandler>
            <IconButton
              color="white"
              variant="outlined"
              className="rounded-full menu-button bg-black"
            >
              <Bars3Icon className="h-6 w-6" />
            </IconButton>
          </MenuHandler>

          <MenuList>
            <MenuItem className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                ></path>
              </svg>
              <Link href={"/departments"}>
                <Typography variant="small" className="font-normal">
                  Departments List
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                ></path>
              </svg>
              <Link href={"/employees"}>
                <Typography variant="small" className="font-normal">
                  Employees List
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                ></path>
              </svg>
              <Link href={"/departments/new"}>
                <Typography variant="small" className="font-normal">
                  Create a Department
                </Typography>
              </Link>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                ></path>
              </svg>
              <Link href={"/employees/new"}>
                <Typography variant="small" className="font-normal">
                  Create a Employee
                </Typography>
              </Link>
            </MenuItem>

            <hr className="my-2 border-blue-gray-50" />
            <MenuItem
              disabled={isLoadingData}
              onClick={() => {
                logOut().then(() => {
                  window.location = "/" as any;
                });
              }}
              className="flex items-center gap-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                />
              </svg>
              <Typography variant="small" className="font-normal">
                {isLoadingData ? <Spinner /> : "Sign Out"}
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  );
}




