"use client";
import React from "react";
import { Select, Option } from "@/app/theme";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { register } from "module";

type Props = {
  label: string;
  fieldName: string;
  registerInputs: (value: string)=> void
  options: Array<{
    id:string,
    value: string
  }>;
};

export function InputWithDropdown({  options, label, registerInputs, fieldName }: Props) {
  return (
    <div className="relative flex w-full max-w-[24rem] my-4">
      <Select onChange={(value)=> registerInputs(`${value}`)} variant="outlined" label={label}>
        {options.map((option) => (
          <Option value={option.id} key={option.id}>{option.value}</Option>
        ))}
      </Select>
    </div>
  );
}
