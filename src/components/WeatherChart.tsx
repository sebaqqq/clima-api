import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { HourlyData } from "../types/weather";

interface WeatherChartProps {
  hourlyData: HourlyData[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ hourlyData }) => {
  const [activeMetrics, setActiveMetrics] = useState({
    temperature: true,
    humidity: true,
    wind: true,
  });

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTooltipTime = (value: string) => {
    const date = new Date(value);
    return date.toLocaleString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    });
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700">
          <p className="text-sm font-medium mb-2 text-gray-200">
            {formatTooltipTime(label)}
          </p>
          {payload.map((entry: any, index: number) => (
            <p
              key={`tooltip-${index}`}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value} {entry.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const toggleMetric = (metric: "temperature" | "humidity" | "wind") => {
    setActiveMetrics({
      ...activeMetrics,
      [metric]: !activeMetrics[metric],
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md transition-all hover:shadow-lg w-full">
      <h2 className="text-xl font-bold text-gray-200 mb-4">
        Pronóstico por Hora
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => toggleMetric("temperature")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeMetrics.temperature
              ? "bg-blue-900 text-blue-200"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          Temperatura
        </button>
        <button
          onClick={() => toggleMetric("humidity")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeMetrics.humidity
              ? "bg-green-900 text-green-200"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          Humedad
        </button>
        <button
          onClick={() => toggleMetric("wind")}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeMetrics.wind
              ? "bg-purple-900 text-purple-200"
              : "bg-gray-700 text-gray-400"
          }`}
        >
          Viento
        </button>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={hourlyData}
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              stroke="#4B5563"
            />
            <YAxis
              yAxisId="temp"
              domain={["auto", "auto"]}
              stroke="#3B82F6"
              hide={!activeMetrics.temperature}
              tick={{ fill: "#9CA3AF" }}
            />
            <YAxis
              yAxisId="humidity"
              orientation="right"
              domain={[0, 100]}
              stroke="#10B981"
              hide={!activeMetrics.humidity}
              tick={{ fill: "#9CA3AF" }}
            />
            <YAxis
              yAxisId="wind"
              orientation="right"
              domain={["auto", "auto"]}
              stroke="#8B5CF6"
              hide={!activeMetrics.wind}
              tick={{ fill: "#9CA3AF" }}
            />
            <Tooltip content={customTooltip} />
            <Legend />
            {activeMetrics.temperature && (
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature_2m"
                name="Temperatura"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
                unit="°C"
              />
            )}
            {activeMetrics.humidity && (
              <Line
                yAxisId="humidity"
                type="monotone"
                dataKey="relative_humidity_2m"
                name="Humedad"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
                unit="%"
              />
            )}
            {activeMetrics.wind && (
              <Line
                yAxisId="wind"
                type="monotone"
                dataKey="wind_speed_10m"
                name="Viento"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 6 }}
                unit="km/h"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeatherChart;
