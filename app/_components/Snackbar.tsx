"use client";
import React from "react";
import { useSnackbarController } from "../_store/snackbar";
import { Button } from "../_lib/theme";
type Props = {
  close: Function;
};
export default function SnackBar() {
  const { snackbarMessage, snackbarIsVisible, closeSnackBar, snackBarTheme } =
    useSnackbarController();

  return (
    snackbarIsVisible && (
      <div
        style={{ zIndex: "1000" }}
        className="bg-pink-600 font-regular absolute block rounded-lg p-4 text-base leading-5 text-white opacity-100 bottom-12 m-auto min-w-[50vw] max-w-11/12"
        data-dismissible="alert"
      >
        <div className="mr-12">{snackbarMessage}</div>
        <div
          className="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
          data-dismissible-target="alert"
        >
          <Button
            onClick={closeSnackBar}
            role="button"
            className="w-max rounded-lg p-1"
            data-alert-dimissible="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
    )
  );
}
