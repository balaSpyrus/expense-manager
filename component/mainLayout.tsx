"use client";
import { filterExpenses } from "@/lib";
import { useUserDetails } from "@/lib/hook";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AddBtn from "./addBtn";
import AddExpense from "./addExpense/addExpense";
import LeftPane from "./leftPane/page";
import RightPane from "./rightPane/page";

const MainLayout = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const { user, isLoading } = useUserDetails();
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

  useEffect(() => {
    if (!user && !isLoading) {
      redirect("/");
    }
  }, [user, isLoading]);

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
