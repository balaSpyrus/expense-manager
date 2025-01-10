"use client";
import { filterExpenses } from "@/lib";
import { useUserDetails } from "@/lib/hook";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { Grid2 } from "@mui/material";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AddBtn from "./addBtn";
import AddExpense from "./addExpense/addExpense";
import LeftPane from "./leftPane";
import RightPane from "./rightPane";
import ThemeProvider from "./themeProvider";

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
    <ThemeProvider>
      <Grid2
        container
        flexDirection={"column"}
        gap={"2rem"}
        sx={{
          p: "2rem",
        }}
        height={"100%"}
      >
        {showAdd && <AddExpense />}
        <LeftPane expenses={filteredExpenses} />
        <RightPane expenses={filteredExpenses} onFilterChange={onChange} />
        <AddBtn onClick={onClick} />
      </Grid2>
    </ThemeProvider>
  );
};

export default MainLayout;
