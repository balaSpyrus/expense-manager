"use client";
import { ChartData, PieController } from "chart.js";
import Chart from "chart.js/auto";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(PieController);

const PieChart = ({
  categorywiseInfo,
}: {
  categorywiseInfo: Record<
    string,
    {
      amount: number;
      color: string;
      label: string;
    }
  >;
}) => {
  const data: ChartData<"pie", number[], unknown> = useMemo(() => {
    const labels: string[] = [];
    const colors: string[] = [];
    const data: number[] = [];

    Object.values(categorywiseInfo).forEach(({ amount, color, label }) => {
      labels.push(label);
      colors.push(color);
      data.push(amount);
    });

    return {
      labels,
      datasets: [
        {
          label: "Total Expenses",
          backgroundColor: colors,
          borderColor: "black",
          data,
          hoverOffset: 10,
        },
      ],
    };
  }, [categorywiseInfo]);

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
