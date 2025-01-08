"use client";

import { getChartData } from "@/lib";
import { ChartData, ExpenseObjType, FilterAttrType } from "@/types";
import { toTitleCase } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ActiveShape } from "recharts/types/util/types";

const renderActiveShape = (
  props: Required<
    Omit<PieSectorDataItem, "payload"> & {
      payload: ChartData;
    }
  >
) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {toTitleCase(payload.label)}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="rgb(var(--foreground))"
      >{`${value.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      })}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: ChartData }[];
}) => {
  if (active && payload?.length) {
    const { amount, total = 0 } = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "rgb(var(--background))",
          padding: "8px",
          border: "1px solid rgb(var(--foreground))",
          borderRadius: "4px",
          boxShadow:
            "0 1px 3px 0 rgba((var(--background), 0.1), 0 1px 2px 0 rgba((var(--background), 0.06)",
        }}
      >
        <p>{`Amount: ${amount.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        })}`}</p>
        <p>{`Percentage: ${((amount / total) * 100).toFixed(2)}%`}</p>
      </div>
    );
  }
  return null;
};

export const ExpensePieChart = ({
  data,
  groupingKey,
}: {
  data: ExpenseObjType[];
  groupingKey: FilterAttrType;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);

  const getData = useCallback(async () => {
    const cData = await getChartData(data, groupingKey);
    setChartData(cData);
  }, [data, groupingKey]);

  const onPieEnter = (_: ChartData, index: number) => {
    setActiveIndex(index);
  };

  const formatter: Formatter = (value, entry) => (
    <span style={{ color: entry.color }}>
      {toTitleCase(value)}:{" "}
      {(entry.payload as unknown as ChartData)?.amount?.toLocaleString(
        "en-IN",
        {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }
      )}
    </span>
  );

  useEffect(() => {
    getData();
  }, [getData]);

  if (!chartData) return <span id="pie-chart" className="loading" />;

  return (
    <ResponsiveContainer width="100%" height="100%" id="pie-chart">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape as ActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
          nameKey="label"
          onMouseEnter={onPieEnter}
          animationBegin={0}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {chartData.map((entry) => (
            <Cell
              key={`cell-${entry.label}`}
              fill={entry.color}
              stroke={"black"}
            />
          ))}
        </Pie>
        {/* <Tooltip content={<CustomTooltip />} /> */}
        <Legend formatter={formatter} />
      </PieChart>
    </ResponsiveContainer>
  );
};
