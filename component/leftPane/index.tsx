import PieChart from "@/component/chart/expenseStats";
import { ExpenseObjType } from "@/types";
import styles from "./leftpane.module.css";
import { Grid2 } from "@mui/material";

const expType = ["expense", "income"] as const;

const LeftPane = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  return (
    <Grid2
      size={{
        sm: 12,
        md: 5,
      }}
      sx={{
        "& > *": {
          width: "100%",
        },
      }}
      container
      height={"100%"}
      className={styles.left_pane}
    >
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
    </Grid2>
  );
};

export default LeftPane;
