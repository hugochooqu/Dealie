"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Sales ($)",
      data: [1200, 1900, 800, 1600, 2300, 2000, 2500],
      backgroundColor: "rgba(79, 70, 229, 0.6)", // Indigo
      borderRadius: 6,
    },
    {
      label: "Profit ($)",
      data: [400, 900, 300, 800, 1200, 1000, 1500],
      backgroundColor: "rgba(16, 185, 129, 0.6)", // Green
      borderRadius: 6,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: { color: "#111" },
    },
  },
  scales: {
    x: { ticks: { color: "#555" }, grid: { display: false } },
    y: { ticks: { color: "#555" }, grid: { color: "#eee" } },
  },
};

export default function SalesProfitChart() {
  return <Bar data={data} options={options} />;
}
