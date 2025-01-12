"use client";
import { filterExpenses } from "@/lib";
import { useAuth } from "@/lib/hook";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { Drawer, Grid2 } from "@mui/material";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import AddBtn from "./addBtn";
import AddExpense from "./addExpense";
import LeftPane from "./leftPane";
import RightPane from "./rightPane";
import ThemeProvider from "./themeProvider";

const MainLayout = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const { user, isLoading } = useAuth();
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
        spacing={3}
        sx={{
          p: 3,
          // overflow: "hidden",
          "& > .MuiGrid2-root": {
            p: 2,
            borderRadius: 2,
            height: "100%",
            background: (theme) => theme.palette.background.paper,
          },
          flexDirection: (theme) =>
            theme.breakpoints.down("md") ? "row" : "unset",
        }}
        height={"100%"}
      >
        <Drawer anchor="left" open={showAdd} onClose={onClick}>
          <AddExpense />
        </Drawer>
        <LeftPane expenses={filteredExpenses} />
        <RightPane expenses={filteredExpenses} onFilterChange={onChange} />
        <AddBtn onClick={onClick} />
      </Grid2>
    </ThemeProvider>
  );
};

export default MainLayout;
