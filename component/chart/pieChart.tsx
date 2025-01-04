"use client";
import { getChartData } from "@/lib";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { ChartData, PieController } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import EMSelect from "../atoms/select";

Chart.register(PieController);

const PieChart = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const [selected, setSelected] = useState<FilterAttrType>("category");
  const [chartData, setChartData] =
    useState<ChartData<"pie", number[], unknown>>();

  const onChange = (value: string) => {
    setSelected(value as FilterAttrType);
    getChartData(expenses, value as FilterAttrType).then((data) => {
      setChartData(data);
    });
  };

  useEffect(() => {
    getChartData(expenses, selected).then((data) => {
      setChartData(data);
    });
  }, [expenses, selected]);

  if (!chartData) {
    return <span id="pie-chart" className="loading" />;
  }

  return (
    <>
      <EMSelect
        titleCase
        onChange={onChange}
        value={selected}
        options={["category", "payment_mode", "account"]}
      />
      <Pie
        id="pie-chart"
        data={chartData}
        options={{
          layout: {
            padding: 30,
          },
          plugins: {
            legend: {
              fullSize: true,
              position: "bottom",
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
    </>
  );
};

export default PieChart;
