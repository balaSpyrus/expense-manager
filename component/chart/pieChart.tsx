"use client";
import { getChartData } from "@/lib";
import { ExpenseObjType, FilterAttrType } from "@/types";
import { ChartData, PieController } from "chart.js";
import Chart from "chart.js/auto";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(PieController);

const PieChart = ({ expenses }: { expenses: ExpenseObjType[] }) => {
  const [selected, setSelected] = useState<FilterAttrType>("category");
  const [chartData, setChartData] =
    useState<ChartData<"pie", number[], unknown>>();

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelected(e.target.value as FilterAttrType);
    getChartData(expenses, e.target.value as FilterAttrType).then((data) => {
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
      <select onChange={onChange} value={selected}>
        <option value={"category"}>Category</option>
        <option value={"payment_mode"}>Payment Mode</option>
        <option value={"account"}>Account</option>
      </select>
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
