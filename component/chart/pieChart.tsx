"use client";

import { getChartData } from "@/lib";
import { ChartData, ExpenseObjType, FilterAttrType } from "@/types";
import { formatCurrency, toTitleCase } from "@/utils";
import { alpha, useMediaQuery, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Formatter } from "recharts/types/component/DefaultLegendContent";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ActiveShape as ActiveShapeProps } from "recharts/types/util/types";
import { ActiveShape } from "./activeShape";
import { CustomTooltip } from "./customTooltip";

export const ExpensePieChart: React.FC<{
  data: ExpenseObjType[];
  groupingKey: FilterAttrType;
}> = ({ data, groupingKey }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);

  const getData = useCallback(async () => {
    const cData = await getChartData(data, groupingKey);
    setChartData(cData);
  }, [data, groupingKey]);

  const onPieEnter = useCallback((_: ChartData, index: number) => {
    setActiveIndex(index);
  }, []);

  const formatter: Formatter = useCallback(
    (value, entry) => (
      <span style={{ color: theme.palette.primary.main }}>
        {toTitleCase(value as string)}:{" "}
        {formatCurrency((entry.payload as unknown as ChartData).amount)}
      </span>
    ),
    [theme.palette.primary.main]
  );

  const onActiveShape = useCallback(
    (props: ActiveShapeProps<PieSectorDataItem>) => (
      <ActiveShape
        {...(props as Required<PieSectorDataItem>)}
        isSmallScreen={isSmallScreen}
      />
    ),
    [isSmallScreen]
  );

  useEffect(() => {
    getData();
  }, [getData]);

  if (!chartData) return <span id="pie-chart" className="loading" />;

  return (
    <ResponsiveContainer
      width="100%"
      height={"100%"}
      id="pie-chart"
      style={{
        background: alpha(theme.palette.primary.main, 0.08),
      }}
    >
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={onActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={isSmallScreen ? "40%" : "30%"}
          outerRadius={isSmallScreen ? "60%" : "50%"}
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
              stroke={theme.palette.background.paper}
            />
          ))}
        </Pie>
        <Tooltip content={isSmallScreen ? <CustomTooltip /> : <></>} />
        <Legend
          layout={isSmallScreen ? "horizontal" : "vertical"}
          align={isSmallScreen ? "center" : "right"}
          verticalAlign={isSmallScreen ? "bottom" : "middle"}
          formatter={formatter}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
