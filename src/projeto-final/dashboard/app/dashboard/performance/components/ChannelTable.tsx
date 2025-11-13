"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(PointElement, Tooltip, Legend, LinearScale, Title);

export default function ChannelScatter() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/performance-by-city").then((res) => setData(res.data));
  }, []);

  if (!data.length) return <p>Carregando gráfico...</p>;

  const chartData = {
    datasets: [
      {
        label: "Cidades",
        data: data.map((d) => ({
          x: d.pedidos,
          y: d.ticket_medio,
          label: d.city,
        })),
        backgroundColor: "#F26A21",
        pointRadius: 6,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const label = ctx.raw.label || "";
            const x = Number(ctx.raw.x);
            const y = Number(ctx.raw.y);
          return `${label}: ${x} pedidos, R$${y.toFixed(2)} ticket médio`;
          },
        },
      },
      legend: { display: false },
      title: {
        display: true,
        text: "Dispersão de Pedidos vs Ticket Médio por Cidade",
        font: { size: 16 },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Número de Pedidos",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ticket Médio (R$)",
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Scatter data={chartData} options={options} />
    </div>
  );
}
