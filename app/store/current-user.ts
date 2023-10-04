import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { User, UserCredentials } from "../global_types";
import { persist } from "zustand/middleware";

type UserState = {
  currentUser: User | null;
  logIn: (userCred: UserCredentials) => Promise<void>;
  logOut: () => Promise<void>;
  validateEmail: (email: string) => Promise<boolean>;
  isLoadingData: boolean
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      validateEmail: async (email) => true,
      logIn: async (userCred: UserCredentials) =>
        set((state) => ({ ...state, currentUser: userCred as any })),
      logOut: async () => set((state) => ({ ...state, currentUser: null })),
      isLoadingData: false
    }),
    { name: "currentUser" }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("AuthStore", useUserStore);
}


