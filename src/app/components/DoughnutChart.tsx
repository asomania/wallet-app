import React, { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, DoughnutController } from "chart.js";

Chart.register(ArcElement, Tooltip, DoughnutController);

const DoughnutChart = ({
  data,
}: {
  data: { totalBudget: number; spent: number };
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"doughnut"> | null>(null);

  const { totalBudget, spent } = data;

  const remainingPercentage =
    spent > totalBudget ? 0 : ((totalBudget - spent) / totalBudget) * 100;
  const spentPercentage =
    spent > totalBudget ? 100 : (spent / totalBudget) * 100;

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current?.getContext("2d");
    if (ctx) {
      chartInstanceRef.current = new Chart<"doughnut">(ctx, {
        type: "doughnut",
        data: {
          labels: ["Kalan", "Harcanan"],
          datasets: [
            {
              data: [remainingPercentage, spentPercentage],
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
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${Number(
                    tooltipItem.raw as number
                  ).toFixed(2)}%`;
                },
              },
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
  }, [remainingPercentage, spentPercentage]);

  if (totalBudget <= 0) {
    return (
      <div className="dark:bg-black bg-white w-full">
        <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
          Gelir sıfır veya negatif olamaz!
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-black bg-white w-full">
      <div>
        <div
          style={{
            position: "relative",
            width: "150px",
            height: "150px",
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
              color: spent > totalBudget ? "red" : "#000",
            }}
          >
            {spent > totalBudget
              ? "Bütçe Aşıldı"
              : `${Number(remainingPercentage).toFixed(2)}%`}
            <br />
            <span style={{ fontSize: "12px", color: "gray" }}>
              {spent > totalBudget ? "Harcama fazla" : "Kalan"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
