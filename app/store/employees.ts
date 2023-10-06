import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { UserEmployeeProfile } from "../global_types";
import { stat } from "fs";

type EmployeeState = {
  isLoadingData: boolean;
  employees: Array<UserEmployeeProfile>;
  getAllEmployeesByEmployeesManagerId: (
    managerId: string
  ) => Promise<Array<UserEmployeeProfile>>;
  getAllEmployeesByEmployeesRole: (
    role: string
  ) => Promise<Array<UserEmployeeProfile>>;
  getEmployee: (employeeId: string) => Promise<UserEmployeeProfile>;
  deleteEmployee: (employeeId: string) => Promise<boolean>;
  editEmployee: (
    userProfile: UserEmployeeProfile
  ) => Promise<UserEmployeeProfile>;
  createEmployee: (userProfile: UserEmployeeProfile) => Promise<void>;
};

export const useEmployeesStore = create<EmployeeState>((set) => ({
  employees: [],
  /**
   *  get employee my ID
   */
  getEmployee: async (employeeId: string) => {
    set((state) => ({ ...state, isLoadingData: true }));
    ///
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees-profile?employeeId=${employeeId}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer TOKEN" },
      }
    );

    const { data } = await response.json();

    set((state) => ({
      ...state,
      isLoadingData: false,
    }));
    return data && data.length > 0 ? data[0] : null;
  },
  /**
   * filter employees by manager id
   */
  getAllEmployeesByEmployeesManagerId: async (managerId) => {
    set((state) => ({ ...state, isLoadingData: true }));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees-profile?managerId=${managerId}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer TOKEN" },
      }
    );

    const { data } = await response.json();

    set((state) => ({
      ...state,
      isLoadingData: false,
      employees: data,
    }));

    return data;
  },
  /**
   * filter employees by role
   */
  getAllEmployeesByEmployeesRole: async (role) => {
    set((state) => ({ ...state, isLoadingData: true }));
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees-profile?role=${role}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer TOKEN" },
      }
    );

    const { data } = await response.json();

    set((state) => ({
      ...state,
      isLoadingData: false,
    }));

    return data;
  },
  editEmployee: async (newEmployee: UserEmployeeProfile) => {
    console.log({ newEmployee });
    set((state) => ({
      ...state,
      isLoadingData: true,
    }));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees-profile?employeeId=${newEmployee.employee_details.employee_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TOKEN",
        },
        body: JSON.stringify(newEmployee),
      }
    );

    const updatedUser = await response.json();
    set((state) => ({
      ...state,
      employees: [
        ...state.employees.filter(
          (employee) => employee.userId != updatedUser.userId
        ),
        updatedUser,
      ],
      isLoadingData: false,
    }));
    return updatedUser;
  },
  createEmployee: async (newEmployee: UserEmployeeProfile) => {
    console.log({ newEmployee });

    set((state) => ({
      ...state,
      isLoadingData: true,
    }));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/employees-profile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TOKEN",
        },
        body: JSON.stringify(newEmployee),
      }
    );

    const updatedUser = await response.json();
    set((state) => ({
      ...state,
      employees: [...state.employees, updatedUser],
      isLoadingData: false,
    }));
  },
  deleteEmployee: async (employeeId) => {
    throw Error("UnImplemented function");
  },
  isLoadingData: false,
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("EmployeesStore", useEmployeesStore);
}