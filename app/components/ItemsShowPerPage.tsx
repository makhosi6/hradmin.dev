"use client";
import { useState } from "react";
import { Select, Option } from "../theme";

type Props = {
  setItemsShownPerPage: (itemsPerPage: number) => void;
};

export default function ItemsShowPerPage({ setItemsShownPerPage }: Props) {
  return (
    <div>
      <Select
        onChange={(itemsPerPage) =>
          setItemsShownPerPage(Number(itemsPerPage || 10))
        }
        color="gray"
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        label="Show per page"
      >
        {VALUES.map((value, index) => (
          <Option key={value + `_${index}`} value={value}>
            {value}
          </Option>
        ))}
      </Select>
    </div>
  );
}

const VALUES = ["5", "10", "20", "50", "100"];
