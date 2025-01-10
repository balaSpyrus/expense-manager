import MainLayout from "@/component/mainLayout";
import { ExpenseObjType } from "@/types";

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
  return <MainLayout expenses={expenses} />;
};

export default Page;
