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

export default function NpsChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/nps-by-city").then((res) => setData(res.data));
  }, []);

  if (!data.length) return <p>Carregando NPS...</p>;

  const chartData = {
    labels: data.map((d) => d.city),
    datasets: [
      {
        label: "NPS Médio",
        data: data.map((d) => d.nps),
        backgroundColor: "#F26A21",
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">NPS por Cidade</h2>
      <Bar data={chartData} />
    </div>
  );
}
