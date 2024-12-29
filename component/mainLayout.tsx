"use client";
import { filterExpenses } from "@/lib";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { useState } from "react";
import LeftPane from "./leftPane/page";
import RightPane from "./rightPane/page";

const MainLayout = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [filterConfig, setFilterConfig] = useState<{
    [key in FilterAttrType]?: string;
  }>({
    category: "",
    payment_mode: "",
  });

  const onChange = async (attr: FilterAttrType, value: string) => {
    const newFilterConfig = { ...filterConfig, [attr]: value };
    setFilterConfig(newFilterConfig);

    const updatedExpenses = await filterExpenses(expenses, newFilterConfig);
    setFilteredExpenses(updatedExpenses);
  };

  return (
    <>
      <LeftPane expenses={filteredExpenses} />
      <RightPane expenses={filteredExpenses} onFilterChange={onChange} />
    </>
  );
};

export default MainLayout;
