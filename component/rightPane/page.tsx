import ExpenseList from "@/component/expense-list";
import { Filter } from "@/component/filter";
import { ExpenseObjType } from "@/types";
import React from "react";
import styles from "./rightpane.module.css";

const RightPane = ({
  expenses,
  onFilterChange,
}: {
  expenses: ExpenseObjType[];
  onFilterChange: (attr: keyof ExpenseObjType, value: string) => void;
}) => {
  return (
    <section className={styles.right_pane}>
      <Filter onCategoryChange={onFilterChange} />
      <ExpenseList expenses={expenses} />
    </section>
  );
};

export default RightPane;
