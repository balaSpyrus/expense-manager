import { ChartData } from "@/types";
import { formatCurrency, toTitleCase } from "@/utils";
import { Paper, Typography, useTheme } from "@mui/material";
import React from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: ChartData }[];
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
}) => {
  const theme = useTheme();
  if (active && payload?.length) {
    const { amount, total = 0, label } = payload[0].payload;
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
          {toTitleCase(label)}
        </Typography>
        <Typography
          variant="body2"
          style={{ color: theme.palette.text.secondary }}
        >
          {`Amount: ${formatCurrency(amount)}`}
        </Typography>
        <Typography
          variant="body2"
          style={{ color: theme.palette.text.secondary }}
        >
          {`Percentage: ${((amount / total) * 100).toFixed(2)}%`}
        </Typography>
      </Paper>
    );
  }
  return null;
};
