import MainLayout from "@/component/mainLayout";
import { ExpenseObjType } from "@/types";
import styles from "./dashboard.module.css";

const getExpenses = async () => {
  let expenses: ExpenseObjType[] = [];
  try {
    const res = await fetch(
      "https://expense-manager-b6f35-default-rtdb.asia-southeast1.firebasedatabase.app/mock.json"
    );
    expenses = await res.json();
  } catch {}

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
