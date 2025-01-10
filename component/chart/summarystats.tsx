/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PALETTE } from "@/constant";
import {
  SummaryData,
  SummaryType,
  TimePeriod,
  TopExpenseCategory,
} from "@/types";
import { toTitleCase } from "@/utils";
import {
  Grid2 as Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface SummaryChartProps {
  data: SummaryType;
}

const COLORS = Object.values(PALETTE.category);

const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useTheme();
  if (active && payload?.length) {
    return (
      <Paper
        style={{
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(1),
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="body2"
          style={{ fontWeight: "bold", color: theme.palette.text.primary }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          style={{ color: theme.palette.text.secondary }}
        >
          {`${payload[0].name}: ${payload[0].value.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          })}`}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const PieChartTooltip = ({ active, payload }: any) => {
  const theme = useTheme();
  const payloadData = payload?.[0]?.payload?.payload as TopExpenseCategory;
  if (active && payloadData) {
    return (
      <Paper
        style={{
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(1),
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="body2"
          style={{ fontWeight: "bold", color: theme.palette.text.primary }}
        >
          {payloadData.category_name}
        </Typography>
        <Typography
          variant="body2"
          style={{ color: theme.palette.text.secondary }}
        >
          {`${payloadData.percentage}%`}
        </Typography>
      </Paper>
    );
  }
  return null;
};

export function SummaryChart({ data }: SummaryChartProps) {
  const theme = useTheme();
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [timePeriod, setTimePeriod] = useState<TimePeriod>("this_month");
  const [selectedData, setSelectedData] = useState<SummaryData>(
    data[timePeriod]
  );

  const handleTimePeriodChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimePeriod: TimePeriod
  ) => {
    if (newTimePeriod !== null) {
      setTimePeriod(newTimePeriod);
    }
  };

  useEffect(() => {
    setSelectedData(data[timePeriod]);
  }, [data, timePeriod]);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        p: 3,
        "& .MuiGrid2-root": {
          background: theme.palette.background.paper,
          p: 2,
          borderRadius: 2,
        },
      }}
    >
      <Grid
        size={{
          xs: 12,
        }}
      >
        <ToggleButtonGroup
          sx={{
            "& .MuiToggleButton-root": {
              color: "primary.light",
              borderColor: "primary.light",
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
          }}
          value={timePeriod}
          exclusive
          fullWidth={smallScreen}
          onChange={handleTimePeriodChange}
          aria-label="time period"
        >
          {Object.keys(data).map((each) => (
            <ToggleButton
              key={each}
              value={each}
              aria-label={each.replace("_", " ")}
            >
              {toTitleCase(each.replace("this_", ""))}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 7,
          lg: 5,
        }}
      >
        <Typography
          variant="h6"
          style={{
            marginBottom: theme.spacing(2),
            color: "text.primary",
          }}
        >
          Top Expense Categories
        </Typography>
        <Grid container alignItems={"center"}>
          <Grid
            sx={{ height: 300, flex: 1 }}
            size={{
              md: 8,
              sm: 12,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={selectedData.top_expense_category}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  dataKey="percentage"
                >
                  {selectedData.top_expense_category.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip content={<PieChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid
            size={{
              md: 4,
              sm: 12,
            }}
          >
            {selectedData.top_expense_category.map((category, index) => (
              <div
                key={category.category_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: theme.spacing(1),
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: COLORS[index % COLORS.length],
                    marginRight: theme.spacing(1),
                  }}
                />
                <Typography variant="body2">
                  {category.category_name}: {category.percentage}%
                </Typography>
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        size={{
          xs: 12,
          md: 4,
          lg: 2,
        }}
      >
        <Typography
          variant="h6"
          style={{
            marginBottom: theme.spacing(2),
            color: "text.primary",
          }}
        >
          Income vs Expense
        </Typography>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                {
                  name: "Income",
                  value: selectedData.income,
                  fill: COLORS[0],
                },
                {
                  name: "Expense",
                  value: selectedData.expense,
                  fill: COLORS[COLORS.length - 1],
                },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Grid>
    </Grid>
  );
}
