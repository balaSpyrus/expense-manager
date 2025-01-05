"use client";
import { filterExpenses } from "@/lib";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { useState } from "react";
import AddBtn from "./addBtn";
import LeftPane from "./leftPane/page";
import RightPane from "./rightPane/page";
import AddExpense from "./addExpense/addExpense";

const MainLayout = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const [showAdd, setShowAdd] = useState(false);
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

  const onClick = () => {
    setShowAdd((prev) => !prev);
  };

  return (
    <>
      {showAdd && <AddExpense />}
      <LeftPane expenses={filteredExpenses} />
      <RightPane expenses={filteredExpenses} onFilterChange={onChange} />
      <AddBtn onClick={onClick} />
    </>
  );
};

export default MainLayout;
