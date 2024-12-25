"use client";

import { ExpenseType } from "@/types";
import React, { useState } from "react";
import ExpenseList from "../expense-list";
import { Filter } from "../filter";
import styles from "./rightpane.module.css";

const RightPane = ({
  expenses,
  categorywiseInfo,
}: {
  expenses: ExpenseType[];

  categorywiseInfo: Record<
    string,
    { amount: number; color: string; label: string }
  >;
}) => {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const onChange = (category: string) => {
    setFilteredExpenses(
      category === ""
        ? expenses
        : expenses.filter((expense) => expense.category === category)
    );
  };

  return (
    <section className={styles["right-pane"]}>
      <Filter categorywiseInfo={categorywiseInfo} onCategoryChange={onChange} />
      <ExpenseList
        expenses={filteredExpenses}
        categorywiseInfo={categorywiseInfo}
      />
    </section>
  );
};

export default RightPane;
