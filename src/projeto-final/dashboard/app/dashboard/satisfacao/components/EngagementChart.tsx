"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function EngagementChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/engajamento-by-city").then((res) => setData(res.data));
  }, []);

  if (!data.length) return <p>Carregando engajamento...</p>;

  const chartData = {
    labels: data.map((d) => d.city),
    datasets: [
      {
        label: "Engajamento (%)",
        data: data.map((d) => d.engajamento * 100),
        backgroundColor: "#3A2F2A",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Engajamento por Cidade</h2>
      <Bar data={chartData} />
    </div>
  );
}
