import { ChartData, PieController } from "chart.js";
import Chart from "chart.js/auto";
import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Pie } from "react-chartjs-2";
import { ExpenseContext } from "../mainFrame";

Chart.register(PieController);

const PieChart = () => {
  const { attrwiseInfo } = useContext(ExpenseContext);
  const [pieInfo, setPieInfo] = useState(attrwiseInfo["payment_mode"]);

  const data: ChartData<"pie", number[], unknown> = useMemo(() => {
    const labels: string[] = [];
    const colors: string[] = [];
    const data: number[] = [];

    Object.values(pieInfo || {}).forEach(({ amount, color, label }) => {
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
  }, [pieInfo]);

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setPieInfo(attrwiseInfo[e.target.value]);
  };

  useEffect(() => {
    if (!pieInfo) {
      setPieInfo(attrwiseInfo["category"]);
    }
  }, [attrwiseInfo]);

  return (
    <>
      <select onChange={onChange} defaultValue={"payment_mode"}>
        <option value={"category"}>Category</option>
        <option value={"payment_mode"}>Payment Mode</option>
        <option value={"account"}>Account</option>
      </select>
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
    </>
  );
};

export default PieChart;
