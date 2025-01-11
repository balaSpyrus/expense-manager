import ExpenseList from "@/component/expense-list";
import { Filter } from "@/component/filter";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { Grid2, Paper } from "@mui/material";

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
        md: 8,
      }}
      component={Paper}
      container
      elevation={3}
      spacing={2}
      sx={{
        overflow: "hidden",
      }}
    >
      <Filter onCategoryChange={onFilterChange} />
      <Grid2
        size={{
          xs: 12,
        }}
        height={"100%"}
      >
        <ExpenseList expenses={expenses} />
      </Grid2>
    </Grid2>
  );
};

export default RightPane;
