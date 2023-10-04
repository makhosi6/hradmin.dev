"use client";
import React from "react";
import { Select, Option } from "@/app/theme";

export function InputWithDropdown() {
  const countries = [{ name: "NAME", flags: "22", countryCallingCode: "27" }];
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = {
    name: "NAME",
    flags: "22",
    countryCallingCode: "27",
  };

  return (
    <div className="relative flex w-full max-w-[24rem] my-4">
      <Select variant="outlined" label="Select Version">
        <Option> HTML</Option>
        <Option> React</Option>
        <Option> Vue</Option>
        <Option> Angular</Option>
        <Option> Svelte</Option>
      </Select>
    </div>
  );
}
