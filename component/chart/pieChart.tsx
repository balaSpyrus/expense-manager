"use client";

import { getChartData } from "@/lib";
import { ChartData, ExpenseObjType, FilterAttrType } from "@/types";
import { toTitleCase } from "@/utils";
import { Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ActiveShape } from "recharts/types/util/types";

const renderActiveShape = (
  props: Required<
    Omit<PieSectorDataItem, "payload"> & {
      payload: ChartData;
    } & {
      isSmallScreen: boolean;
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
    isSmallScreen,
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
    <g
      style={{
        zIndex: 99999,
      }}
    >
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {toTitleCase(payload.label)}
      </text>
      {isSmallScreen ? (
        <></>
      ) : (
        <>
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
        </>
      )}
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
        >{`Amount: ${amount.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        })}`}</Typography>
        <Typography
          variant="body2"
          style={{ color: theme.palette.text.secondary }}
        >{`Percentage: ${((amount / total) * 100).toFixed(2)}%`}</Typography>
      </Paper>
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
  const theme = useTheme();
  const smallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
    <span style={{ color: theme.palette.primary.main }}>
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
    <ResponsiveContainer width="100%" height="50%" id="pie-chart">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape as ActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius="50%"
          outerRadius="70%"
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
        <Tooltip content={smallScreen ? <CustomTooltip /> : <></>} />
        <Legend
          {...(smallScreen
            ? {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              }
            : {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
              })}
          formatter={formatter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
