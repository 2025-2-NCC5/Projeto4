"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function OrdersPerMonthChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/orders-per-month")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData([]));
  }, []);

  if (!data.length) return <div>Carregando...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-medium mb-4">Pedidos por Mês</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#F26A21" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}