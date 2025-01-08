import ExpenseList from "@/component/expense-list";
import { Filter } from "@/component/filter";
import { ExpenseObjType, FilterAttrType } from "@/types";
import styles from "./rightpane.module.css";

const RightPane = ({
  expenses,
  onFilterChange,
}: {
  expenses: ExpenseObjType[];
  onFilterChange: (attr: FilterAttrType, value: string) => void;
}) => {
  return (
    <section className={styles.right_pane}>
      <Filter onCategoryChange={onFilterChange} />
      <ExpenseList expenses={expenses} />
    </section>
  );
};

export default RightPane;
