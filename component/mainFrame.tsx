"use client";
import { ExpenseType } from "@/types";
import React, { createContext, useEffect, useState } from "react";
import ExpenseList from "./expense-list";
import { Filter } from "./filter";
import styles from "./mainFrame.module.css";
import PieChart from "./chart/pieChart";
import { getAttrwiseInfo } from "@/utils";

//creae a react context to pass the expenses
export const ExpenseContext = createContext<{
  expenses: ExpenseType[];
  attrwiseInfo: Record<
    string,
    Record<string, { amount: number; color: string; label: string }>
  >;
}>({
  expenses: [],
  attrwiseInfo: {},
});

const MainFrame = ({ expenses }: { expenses: ExpenseType[] }) => {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [filterConfig, setFilterConfig] = useState({
    category: "",
    payment_mode: "",
  });

  const onChange = (attr: keyof ExpenseType, value: string) =>
    setFilterConfig((prev) => ({
      ...prev,
      [attr]: value,
    }));

  useEffect(() => {
    setFilteredExpenses(
      expenses.filter(
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
    <ExpenseContext.Provider
      value={{
        expenses,
        attrwiseInfo: {
          category: getAttrwiseInfo(expenses, "category"),
          payment_mode: getAttrwiseInfo(expenses, "payment_mode"),
          account: getAttrwiseInfo(expenses, "account"),
        },
      }}
    >
      <>
        <section className={styles["left-pane"]}>
          <h3 className={styles.title}>Category-wise Expense Distribution</h3>
          <h1 className={styles["amt-container"]}>
            Total Expenses :{" "}
            <span className={styles.amount}>
              {filteredExpenses
                .reduce((acc, { total_amount }) => acc + +total_amount, 0)
                .toFixed(2)}
              $
            </span>
          </h1>
          <PieChart />
        </section>
        <section className={styles["right-pane"]}>
          <Filter onCategoryChange={onChange} />
          <ExpenseList expenses={filteredExpenses} />
        </section>
      </>
    </ExpenseContext.Provider>
  );
};

export default MainFrame;
