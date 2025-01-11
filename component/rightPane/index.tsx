import ExpenseList from "@/component/expense-list";
import { Filter } from "@/component/filter";
import { ExpenseObjType, FilterAttrType } from "@/types";
import styles from "./rightpane.module.css";
import { Grid2 } from "@mui/material";

const RightPane = ({
  expenses,
  onFilterChange,
}: {
  expenses: ExpenseObjType[];
  onFilterChange: (attr: FilterAttrType, value: string) => void;
}) => {
  return (
    <Grid2
      size={{
        xs: 12,
        sm: 12,
        md: 7,
      }}
      container
      height={"100%"}
      width={"100%"}
      flexDirection={"column"}
      className={styles.right_pane}
    >
      <Filter onCategoryChange={onFilterChange} />
      <ExpenseList expenses={expenses} />
    </Grid2>
  );
};

export default RightPane;
