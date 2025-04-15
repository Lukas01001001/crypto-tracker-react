// /components/BtcDominanceChart/BtcDominanceChart.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./BtcDominanceChart.module.scss";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const data = {
  labels: [
    "May 2024",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan 2025",
    "Feb",
    "Mar",
    "Apr",
  ],
  datasets: [
    {
      label: "BTC Dominance (%)",
      data: [
        52.4, 53.1, 54.2, 55.8, 56.7, 58.1, 59.3, 60.5, 61.0, 61.5, 62.1, 63.0,
      ],
      borderColor: "#f7931a",
      backgroundColor: "rgba(247, 147, 26, 0.1)",
      tension: 0.3,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      beginAtZero: false,
      suggestedMin: 50,
      suggestedMax: 65,
      ticks: {
        callback: (val) => `${val}%`,
      },
    },
  },
};

export default function BtcDominanceChart() {
  return (
    <div className={styles.chartWrapper}>
      <h2>5 BTC Dominance (Past 12 Months)</h2>
      <Line data={data} options={options} />
    </div>
  );
}
