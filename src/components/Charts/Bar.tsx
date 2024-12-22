import React from "react";
import { AxisOptions, Chart } from "react-charts";
import ResizableBox from "./ResizableBox";
import useDemoConfig from "../../hooks/useDemoConfig";
export default function Bar({
  title,
  dataType,
}: {
  title: string;
  dataType: "ordinal" | "linear" | "time";
}) {
  const { data, randomizeData } = useDemoConfig({
    series: 1,
    dataType: dataType,
  });

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <ResizableBox title={title}>
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </ResizableBox>
  );
}
