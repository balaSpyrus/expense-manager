"use client";
import React, { useMemo } from "react";
import { ChartData, PieController } from "chart.js";
import Chart from "chart.js/auto";
import { ExpenseType } from "@/types";
import { Pie } from "react-chartjs-2";
import { generateColor } from "@/utils";

Chart.register(PieController);

const PieChart = ({
  expenses,
  amounts,
}: {
  expenses: ExpenseType[];
  amounts: Record<string, number>;
}) => {
  const data: ChartData<"pie", number[], unknown> = useMemo(() => {
    const labels = [...new Set(expenses.map((expense) => expense.category))];

    const colors = labels.map(generateColor);

    return {
      labels,
      datasets: [
        {
          label: "Total Expenses",
          backgroundColor: colors,
          borderColor: "black",
          data: Object.values(amounts),
          hoverOffset: 10,
        },
      ],
    };
  }, [amounts, expenses]);

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          legend: {
            fullSize: true,
            labels: {
              color: "white",
              font: {
                size: 14,
              },
            },
          },
        },
      }}
    />
  );
};

export default PieChart;
