import { departments } from "./../api/data";
import { Dept } from "./../global_types";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

type DeptState = {
  departments: Array<Dept>;
  getOne: (deptId: string) => Dept | null;
  isLoadingData: boolean;
  setAllDept: () => Promise<void>;
  createDept: (dept: Dept) => Promise<void>;
  updateDept: (dept: Dept) => Promise<void>;
};

export const useDeptStore = create<DeptState>((set, get) => ({
  isLoadingData: false,
  departments: [],
  updateDept: async (dept: Dept) => {
    /// loading state
    set((state) => ({ ...state, isLoadingData: true }));


    ///
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer TOKEN",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dept),
      }
    );
    const updatedDept = await response.json()
    if (response.status === 200 || response.status === 201) {
      set((state) => ({
        ...state,
        departments: [
          ...state.departments.filter((_dept) => _dept.id !== dept.id),
          updatedDept,
        ],
      }));
    }

    set((state) => ({ ...state, isLoadingData: false,  }));
  },
  createDept: async (dept: Dept) => {
    /// loading state
    set((state) => ({ ...state, isLoadingData: true }));

    ///
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer TOKEN",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dept),
      }
    );
    const data = await response.json();
    if (response.status === 200 || response.status === 201) {
      set((state) => ({ ...state, departments: [...state.departments, data] }));
    }
    set((state) => ({ ...state, isLoadingData: false }));
  },
  getOne:  (deptId) => {
    
    const data = get().departments.filter((dept) => dept.id === deptId);
    if (data.length == 0) return null;
    return data[0];
  },
  setAllDept: async () => {
    /// loading state
    set((state) => ({ ...state, isLoadingData: true }));
    ///
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/departments`,
      {
        method: "GET",
        headers: { Authorization: "Bearer TOKEN" },
      }
    );

    const { data } = await response.json();

    set((state) => ({
      ...state,
      isLoadingData: false,
      departments: data,
    }));
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("DepartmentsStore", useDeptStore);
}
