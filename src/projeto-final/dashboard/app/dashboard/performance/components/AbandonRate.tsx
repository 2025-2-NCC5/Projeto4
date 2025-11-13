"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AbandonRate() {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    axios.get("/api/abandon-rate").then((res) => setRate(res.data.rate));
  }, []);

  if (rate === null) return <p>Carregando taxa de abandono...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Taxa de Abandono</h2>
      <p className="text-xl font-bold">{(rate * 100).toFixed(1)}%</p>
      <p className="text-sm text-gray-600 mt-1">Clientes que nunca fizeram pedidos.</p>
    </div>
  );
}
