import React from "react";
import { AxisOptions, Chart } from "react-charts";
import ResizableBox from "./ResizableBox";

interface MonthlyStats {
  month: number;
  newAdvertCount: number;
  newDealerCount: number;
}

type ChartData = {
  primary: string;
  secondary: number;
}

const defaultData = [{
  label: "Veri Yok",
  data: [{ primary: "Ocak", secondary: 0 }]
}];

export default function Bar({
  title,
  dataType,
  data: monthlyStats,
}: {
  title: string;
  dataType: "ordinal" | "linear" | "time";
  data?: MonthlyStats[];
}) {
  const chartData = React.useMemo<{ label: string; data: ChartData[] }[]>(() => {
    if (!monthlyStats?.length) return defaultData;

    const sortedData = [...monthlyStats].sort((a, b) => a.month - b.month);
    const months = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];

    return [
      {
        label: title.includes("Müşteri") ? "Bayi Sayısı" : "İlan Sayısı",
        data: sortedData.map((stat) => ({
          primary: months[stat.month - 1],
          secondary: title.includes("Müşteri") ? stat.newDealerCount : stat.newAdvertCount,
        })),
      },
    ];
  }, [monthlyStats, title]);

  const primaryAxis = React.useMemo<AxisOptions<ChartData>>(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<AxisOptions<ChartData>[]>(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: "bar",
      },
    ],
    []
  );

  return (
    <ResizableBox title={title}>
      <Chart
        options={{
          data: chartData,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </ResizableBox>
  );
}
