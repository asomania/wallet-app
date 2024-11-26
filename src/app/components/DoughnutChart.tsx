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
      <div className=" w-full">
        <div className="dark:text-red-300 text-red-500 p-4  text-center ">
          Gelir sıfır veya negatif olamaz!
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full">
      <div className="flex justify-center items-center">
        <div
          style={{
            position: "relative",
            width: "150px",
            height: "150px",
          }}
        >
          <canvas ref={chartRef} />
          <div
            className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-xl"
            style={{
              color: spent > totalBudget ? "red" : "#000",
            }}
          >
            <p className="dark:text-white text-xl">
              {spent > totalBudget
                ? "Bütçe Aşıldı"
                : `${Number(remainingPercentage).toFixed(2)}%`}
            </p>
            <span className="dark:text-white text-xl font-bold">
              {spent > totalBudget ? "Harcama fazla" : "Kalan"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
