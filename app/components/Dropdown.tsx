"use client";
import React from "react";
import { Select, Option } from "@/app/theme";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { register } from "module";

type Props = {
  label: string;
  fieldName: string;
  onChange: (value: any) => void;
  options: Array<{
    id: string;
    value: any;
  }>;
};

export function InputWithDropdown({
  options,
  label,
  onChange,
  fieldName,
}: Props) {
  return (
    <div className="relative flex w-full max-w-[24rem] my-4">
      <Select
        onChange={(value) => onChange(`${value}`)}
        variant="outlined"
        label={label}
      >
        {options.map((option, index) => (
          <Option key={option.id + `_${index}`} value={option.id}>
            {option.value}
          </Option>
        ))}
      </Select>
    </div>
  );
}
