import { ExpenseType } from "@/types";
import { getAttrwiseInfo } from "@/utils";
import { ChartData, PieController } from "chart.js";
import Chart from "chart.js/auto";
import { ChangeEventHandler, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(PieController);

const PieChart = ({ expenses }: { expenses: ExpenseType[] }) => {
  const [selected, setSelected] = useState<
    "category" | "payment_mode" | "account"
  >("category");

  const data: ChartData<"pie", number[], unknown> = useMemo(() => {
    const labels: string[] = [];
    const colors: string[] = [];
    const data: number[] = [];

    Object.values(getAttrwiseInfo(expenses, selected)).forEach(
      ({ amount, color, label }) => {
        labels.push(label);
        colors.push(color);
        data.push(amount);
      }
    );

    return {
      labels,
      datasets: [
        {
          label: "Total Expenses",
          backgroundColor: colors,
          borderColor: "black",
          data,
          hoverOffset: 50,
        },
      ],
    };
  }, [expenses, selected]);

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelected(e.target.value as typeof selected);
  };

  return (
    <>
      <select onChange={onChange} value={selected}>
        <option value={"category"}>Category</option>
        <option value={"payment_mode"}>Payment Mode</option>
        <option value={"account"}>Account</option>
      </select>
      <Pie
        id="pie-chart"
        data={data}
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
