"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  Percipitation: {
    label: "Precipitation",
    color: "hsl(var(--chart-1))",
  },
  Snowfall: {
    label: "Snowfall",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chart({ percipitation, snowfall, time, }: { percipitation: number[]; snowfall: number[]; time: string[]; }) {


  if (!time || time.length === 0) {
    return (
      <div className="w-full flex flex-col items-center align-middle justify-center text-xl p-4 text-gray-600">
        <span>No forecast data available. Please search for a location.</span>
      </div>
    );
  }


  if (!percipitation || percipitation.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-4 text-gray-600">
        <span>Loading precipitation data...</span>
      </div>
    );
  }

  if (!snowfall || snowfall.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-4 text-gray-600">
        <span>Loading snowfall data...</span>
      </div>
    );
  }

  const upcomingItems = time.map((t, index) => ({
    time: t,
    Percipitation: percipitation[index] || 0,
    Snowfall: snowfall[index] || 0,
  }));

  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("Percipitation");

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Precipitation and Snowfall Chart</CardTitle>
          <CardDescription>
           Forecast for the upcoming 14 days
          </CardDescription>
        </div>
        <div className="flex">
          {["Percipitation", "Snowfall"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[150px] w-full"
        >
          <LineChart
            data={upcomingItems}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={chartConfig[activeChart].color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
