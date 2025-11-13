"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function RevenueChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/orders-per-month").then((res) => setData(res.data));
  }, []);

  if (!data.length) return <p>Carregando gráfico...</p>;

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Receita por mês",
        data: data.map((d) => d.total),
        borderColor: "#F26A21",
        backgroundColor: "rgba(242, 106, 33, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Receita Mensal</h2>
      <Line data={chartData} />
    </div>
  );
}
