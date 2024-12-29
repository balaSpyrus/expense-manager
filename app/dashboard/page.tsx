import MainLayout from "@/component/mainLayout";
import { ExpenseObjType } from "@/types";
import { promises as fs } from "fs";
import styles from "./dashboard.module.css";

const getDummyData = async () => {
  const file = await fs.readFile(
    process.cwd() + "/public/MOCK_DATA.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return data as ExpenseObjType[];
};

const getExpenses = async () => {
  let expenses: ExpenseObjType[] = [];
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

const Page = async () => {
  const expenses = await getExpenses();
  return (
    <div className={styles.container}>
      <MainLayout expenses={expenses} />
    </div>
  );
};

export default Page;
