"use client";
import { useState } from "react";
import { Select , Option } from "../theme";

export default function ItemsShowPerPage() {
  const [selectedVal, onSelect] = useState<any>("10");
  return (
    <div>
      <Select
        onChange={onSelect}
        color="gray"
        value={selectedVal}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
        label="Show per page"
      >
        <Option key="10">10</Option>
        <Option key="20">20</Option>
        <Option key="50">50</Option>
        <Option key="100">100</Option>
        <Option key="all">All</Option>
      </Select>
    </div>
  );
}