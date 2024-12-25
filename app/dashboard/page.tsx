import MainFrame from "@/component/mainFrame";
import { ExpenseType } from "@/types";
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

  return (
    <div className={styles.container}>
      <MainFrame expenses={expenses} />
    </div>
  );
};

export default Dashboard;
