import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { User,UserCredentials, UserEmployeeProfile } from "../global_types";
import { persist } from "zustand/middleware";

type UserState = {
  authToken: string | null;
  currentUser: UserEmployeeProfile | null;
  logIn: (userCred: UserCredentials) => Promise<void>;
  logOut: () => Promise<void>;
  validateEmail: (email: string) => Promise<boolean>;
  isLoadingData: boolean;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      authToken: null,
      currentUser: null,
      validateEmail: async (email) => {
        try {
          let response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/validate-email?email=${email}`,
            {
              method: "HEAD",
              headers: {
                Authorization: "Bearer TOKEN",
              },
            }
          );

          if (response.status === 200) return false;

          return true;
        } catch (error) {
          console.log({ error });

          return true;
        }
      },
      logIn: async function (userCredentials) {
        // loading
        set((state) => ({ ...state, isLoadingData: true }));
        // /// get data
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer TOKEN",
            },
            body: JSON.stringify(userCredentials),
          }
        );
        const data = await response.json();
        set((state) => ({
          ...state,
          isLoadingData: false,
          currentUser: data.userProfile ,
          authToken: data.token,
        }));
      },
      logOut: async () => {
        set(state => ({...state,isLoadingData: true}));
        await new Promise(res => setTimeout(res, 1000))
        set((state) => ({ ...state, currentUser: null , authToken: null, isLoadingData: false}))
      },
      isLoadingData: false,
    }),
    { name: "currentUser" }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("AuthStore", useUserStore);
}
