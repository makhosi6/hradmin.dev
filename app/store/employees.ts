import { employees } from "./../api/data";
import { type } from "os";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { UserEmployeeProfile } from "../global_types";

type EmployeeState = {
  isLoadingData: false,
  employees: Array<UserEmployeeProfile>;
  getAllEmployees: (managerId?: string) => Promise<void>;
  deleteEmployee: (employeeId?: string) => Promise<void>;
  editEmployee: (userProfile: UserEmployeeProfile) => Promise<void>;
};

export const useEmployeesStore = create<EmployeeState>((set) => ({
  employees: [],
  getAllEmployees: async (managerId) =>
    set((state) => ({ ...state, employees: [] })),
  editEmployee: async (newEmployee: UserEmployeeProfile) => {
    set((state) => ({
      ...state,
      employees: state.employees?.filter(
        (employee) => employee.userId != newEmployee.userId
      ),
      /// .push(newEmployee)
    }));
  },
  deleteEmployee: async (employeeId) => {},
  isLoadingData: false
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("EmployeesStore", useEmployeesStore);
}
