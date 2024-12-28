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
  let expenses: ExpenseType[] = [];
  try {
    const res = await fetch("http://localhost:3000/api/expenses");
    expenses = await res.json();
  } catch {
    expenses = await getDummyData();
  }

  return expenses.sort((a, b) => {
    return new Date(b.bill_date).getTime() - new Date(a.bill_date).getTime();
  });
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
