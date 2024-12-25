import PieChart from "@/component/chart/pieChart";
import RightPane from "@/component/rightpane";
import { ExpenseType } from "@/types";
import { formatCategory, generateColor } from "@/utils";
import { promises as fs } from "fs";
import { NextPage } from "next";
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
  const categorywiseInfo = expenses.reduce(
    (expense, { total_amount, category }) => {
      if (expense[category]) {
        expense[category].amount += +total_amount;
      } else {
        expense[category] = {
          amount: +total_amount,

          color: generateColor(),
          label: formatCategory(category),
        };
      }
      return expense;
    },
    {} as Record<string, { amount: number; color: string; label: string }>
  );

  return (
    <div className={styles.container}>
      <section className={styles["left-pane"]}>
        <h3 className={styles.title}>Category-wise Expense Distribution</h3>
        <h1 className={styles["amt-container"]}>
          Total Expenses :{" "}
          <span className={styles.amount}>
            {Object.values(categorywiseInfo)
              .reduce((acc, { amount }) => acc + +amount, 0)
              .toFixed(2)}
            $
          </span>
        </h1>
        <PieChart categorywiseInfo={categorywiseInfo} />
      </section>
      <RightPane expenses={expenses} categorywiseInfo={categorywiseInfo} />
    </div>
  );
};

export default Dashboard;
