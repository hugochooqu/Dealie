// components/NegotiationChart.tsx
"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  Title
);

type Props = { dataPoints?: number[]; labels?: string[] };

export default function NegotiationChart({
  dataPoints = [5, 9, 12, 7, 10, 8, 11],
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Negotiations",
        data: dataPoints,
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79,70,229,0.12)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // <-- critical
    animation: false as const,           // disable animation to avoid layout loops
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, ticks: { stepSize: 5 } },
    },
  };

  return (
    // fixed pixel height wrapper (use Tailwind or style)
    <div className="w-full" style={{ height: 300 }}>
      <Line data={data} options={options} />
    </div>
  );
}
