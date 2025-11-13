"use client";

import useSWR from "swr";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function NpsChart() {
  const { data, isLoading } = useSWR("/api/nps-by-restaurant", fetcher);

  if (isLoading) return <p>Carregando gráfico...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">NPS por Restaurante</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="restaurant" />
          <YAxis domain={[-100, 100]} />
          <Tooltip />
          <Bar dataKey="nps" fill="#F26A21" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}