"use client";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { useState } from "react";
import Dropdown from "../atoms/dropdown";
import { ExpensePieChart } from "./pieChart";

const PieChart = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const [selected, setSelected] = useState<FilterAttrType>("category");

  const onChange = (value: string) => {
    setSelected(value as FilterAttrType);
  };

  return (
    <>
      <Dropdown
        titleCase
        onChange={onChange}
        value={selected}
        options={["category", "payment_mode", "account"]}
      />
      <ExpensePieChart groupingKey={selected} data={expenses} />
    </>
  );
};

export default PieChart;
