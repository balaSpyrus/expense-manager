"use client";
import { SummaryChart } from "@/component/chart/summarystats";
import ThemeProvider from "@/component/themeProvider";
import { SummaryType } from "@/types";
import { useEffect, useState } from "react";

const getDashboardStats = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stats: Record<string, any> = {};
  try {
    const res = await fetch((process.env.URL ?? "") + "/api/dashboard", {
      headers: {
        "user-id": localStorage.getItem("uid") ?? "dummy",
      },
    });
    stats = await res.json();
  } catch (e) {
    console.log(e);
  }

  return stats;
};

const Page = () => {
  const [summaryData, setSummaryData] = useState<SummaryType | undefined>();

  useEffect(() => {
    getDashboardStats().then((data) => {
      setSummaryData(data.data.summary);
    });
  }, []);

  if (!summaryData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <SummaryChart data={summaryData} />
    </ThemeProvider>
  );
};

export default Page;
