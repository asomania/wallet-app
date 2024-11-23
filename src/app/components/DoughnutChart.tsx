"use client";
import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, DoughnutController } from "chart.js";

Chart.register(ArcElement, Tooltip, DoughnutController);
const DoughnutChart = ({
  data,
}: {
  data: { totalBudget: number; spent: number };
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const totalBudget = data.totalBudget;
  const spent = data.spent;

  const spentPercentage = (spent / totalBudget) * 100;
  const remainingPercentage = 100 - spentPercentage;

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Harcanan", "Kalan"],
          datasets: [
            {
              data: [spentPercentage, remainingPercentage],
              backgroundColor: ["#3B82F6", "#E5E7EB"],
              borderWidth: 2,
              borderAlign: "inner",
              borderRadius: 10,
            },
          ],
        },
        options: {
          cutout: "85%",
          responsive: true,
          plugins: {},
        },
      });
    }
  }, [spentPercentage, remainingPercentage]);

  return (
    <div className="dark:bg-black bg-white w-full">
      <div>
        <div
          style={{
            position: "relative",
            width: "200px",
            height: "200px",
          }}
        >
          <canvas ref={chartRef} />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontSize: "18px",
              color: "#000",
            }}
          >
            {Number(spentPercentage).toFixed(2)}% <br />
            <span style={{ fontSize: "12px", color: "gray" }}>Harcanan</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
