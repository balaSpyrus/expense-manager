import { ExpenseObjType, FilterAttrType } from "@/types";
import {
  alpha,
  Box,
  Grid2 as Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Dropdown from "./atoms/dropdown";
import { ExpensePieChart } from "./chart/pieChart";

const expType = ["expense", "income"] as const;
const options = ["category", "payment_mode", "account"];

const LeftPane = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const [selected, setSelected] = useState<FilterAttrType>("category");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onChange = (value: string) => {
    setSelected(value as FilterAttrType);
  };

  return (
    <Grid
      container
      component={Paper}
      elevation={3}
      size={{
        xs: 12,
        sm: 12,
        md: 4,
      }}
      spacing={2}
    >
      <Grid size={{ xs: 12 }} display={"flex"} alignItems={"center"}>
        <Typography variant="h5">Expense Distribution</Typography>
      </Grid>

      <Grid container size={{ xs: 12 }} spacing={2}>
        {expType.map((type) => (
          <Grid size={{ sm: 6, xs: 12 }} key={type}>
            <Paper
              elevation={2}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: alpha(theme.palette.primary.main, 0.08),
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
              <Typography
                variant="h4"
                color={type === "expense" ? "error" : "success"}
              >
                ₹
                {expenses
                  .reduce(
                    (acc, { total_amount, type: expenseType }) =>
                      acc + (expenseType === type ? +total_amount : 0),
                    0
                  )
                  .toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid size={{ xs: 12 }} display={"flex"} alignItems={"center"}>
        <Dropdown
          titleCase
          onChange={onChange}
          value={selected}
          options={options}
          fullWidth
          style={{
            width: "100%",
            margin: 0,
          }}
        />
      </Grid>

      <Grid
        size={{ xs: 12 }}
        sx={{ height: isSmallScreen ? "300px" : "400px" }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <ExpensePieChart groupingKey={selected} data={expenses} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LeftPane;
