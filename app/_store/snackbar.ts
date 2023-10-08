import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
type SnackbarControllerState = {
  snackbarIsVisible: boolean;
  snackbarMessage: string;
  snackBarTheme: string;
  showSnackBar: (params: {
    message: string;
    show?: boolean;
    snackBarTheme: string;
  }) => void;
  closeSnackBar: () => void;
};

export const useSnackbarController = create<SnackbarControllerState>((set) => ({
  snackbarIsVisible: false,
  snackbarMessage: "No Message",
  snackBarTheme: "",
  closeSnackBar: () =>
    set((state) => ({
      snackbarIsVisible: false,
      snackBarTheme: "",
      snackbarMessage: "No Message",
    })),
  showSnackBar: ({ message, show, snackBarTheme }) => {
    set((state) => ({
      snackBarTheme,
      snackbarIsVisible: show || true,

      snackbarMessage: message,
    }));

    setTimeout(() => {
      set((state) => ({
        snackbarIsVisible: false,
        snackBarTheme: "",
        snackbarMessage: "No Message",
      }));
    }, 5000);
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("SnackbarController", useSnackbarController);
}
