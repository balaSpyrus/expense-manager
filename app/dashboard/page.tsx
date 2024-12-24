import PieChart from "@/component/chart/pieChart";
import ExpenseList from "@/component/expenseList";
import { NextPage } from "next";
import { ExpenseType } from "@/types";
import { promises as fs } from "fs";
import styles from "./dashboard.module.css";

const getDummyData = async () => {
  const file = await fs.readFile(
    process.cwd() + "/public/MOCK_DATA.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return data as ExpenseType[];
};

const getExpenses = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/expenses");
    const expenses = (await res.json()) as ExpenseType[];
    return expenses;
  } catch {
    return getDummyData();
  }
};

const Dashboard: NextPage = async () => {
  const expenses = await getExpenses();

  const amounts = expenses.reduce(
    (expense, acc) => ({
      ...expense,
      [acc.category]: (expense?.[acc.category] || 0) + +acc.total_amount,
    }),
    {} as Record<string, number>
  );

  return (
    <div className={styles.container}>
      <section className={styles["left-pane"]}>
        <h3 className={styles.title}>Category-wise Expense Distribution</h3>
        <h1 className={styles["amt-container"]}>
          Total Expenses :{" "}
          <span className={styles.amount}>
            {Object.values(amounts)
              .reduce((acc, amount) => acc + +amount, 0)
              .toFixed(2)}
            $
          </span>
        </h1>
        <PieChart expenses={expenses} amounts={amounts} />
      </section>
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Dashboard;
