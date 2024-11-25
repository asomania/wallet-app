import React, { useRef, useEffect } from "react";
import {
  Chart,
  LinearScale,
  LineController,
  CategoryScale,
  PointElement,
} from "chart.js";
import { LineElement } from "chart.js";

Chart.register(
  LineElement,
  LinearScale,
  LineController,
  CategoryScale,
  PointElement
);

const LineChart = ({ label, data }: { label: string; data: number[] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      chartInstanceRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: data.length }, (_, i) => `Day ${i + 1}`),
          datasets: [
            {
              label: label,
              data: data,
              borderColor: "#3B82F6",
              tension: 0.4,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, label]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
