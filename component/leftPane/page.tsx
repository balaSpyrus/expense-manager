import React from "react";
import styles from "./leftpane.module.css";
import PieChart from "@/component/chart/pieChart";
import { ExpenseObjType } from "@/types";

const expType = ["expense", "income"] as const;

const LeftPane = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  console.log(expenses);

  if (!expenses?.length) {
    return <h2>No expenses found</h2>;
  }

  return (
    <section className={styles.left_pane}>
      <h3 className={styles.title}>Expense Distribution</h3>
      <div className={styles.amt_container}>
        {expType.map((type) => (
          <span key={type}>
            <h2>Total {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <span className={`${styles.amount} ${styles[type]}`}>
              {expenses
                .reduce(
                  (acc, { total_amount, type: expenseType }) =>
                    acc + (expenseType === type ? +total_amount : 0),
                  0
                )
                .toFixed(2)}
              $
            </span>
          </span>
        ))}
      </div>
      <PieChart expenses={expenses} />
    </section>
  );
};

export default LeftPane;
