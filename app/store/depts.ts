import { Dept } from './../global_types';
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

type DeptState = {
  departments: Array<Dept>;
  getOne: (deptId: string) => Promise<Dept>;
  isLoadingData: boolean;
  // getAll: () => Promise<Array<Dept>>
  setAllDept: () => Promise<void>;
};

export const useDeptStore = create<DeptState>((set, get) => ({
  isLoadingData: false,
  departments: [],
  getOne: async (deptId) => get().departments.filter(dept  => dept.id === deptId)[0],
  setAllDept: async () => set((state) => ({ ...state, currentUser: null })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("DepartmentsStore", useDeptStore);
}
