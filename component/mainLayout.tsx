"use client";
import { ExpenseObjType } from "@/types";
import { useEffect, useState } from "react";
import LeftPane from "./leftPane/page";
import RightPane from "./rightPane/page";

const MainLayout = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [filterConfig, setFilterConfig] = useState({
    category: "",
    payment_mode: "",
  });

  const onChange = (attr: keyof ExpenseObjType, value: string) =>
    setFilterConfig((prev) => ({
      ...prev,
      [attr]: value,
    }));

  useEffect(() => {
    setFilteredExpenses(
      expenses?.filter(
        ({ payment_mode, category }) =>
          (filterConfig.category === ""
            ? true
            : filterConfig.category === category) &&
          (filterConfig.payment_mode === ""
            ? true
            : filterConfig.payment_mode === payment_mode)
      )
    );
  }, [expenses, filterConfig]);

  return (
    <>
      <LeftPane expenses={filteredExpenses} />
      <RightPane expenses={filteredExpenses} onFilterChange={onChange} />
    </>
  );
};

export default MainLayout;
