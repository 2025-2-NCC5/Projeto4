"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function KpiCards({ cidade, periodo }: { cidade: string; periodo: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const query = new URLSearchParams();
    if (cidade) query.append("cidade", cidade);
    if (periodo) query.append("periodo", periodo);

    axios
      .get(`/api/metrics?${query.toString()}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Erro ao buscar KPIs:", err));
  }, [cidade, periodo]);

  if (!data) return <p>Carregando KPIs...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Clientes</p>
        <p className="text-xl font-bold">{data.totalCustomers}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Pedidos</p>
        <p className="text-xl font-bold">{data.totalOrders}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">Ticket Médio</p>
        <p className="text-xl font-bold">R$ {data.avgTicket.toFixed(2)}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500">NPS Médio</p>
        <p className="text-xl font-bold">{data.avgNps.toFixed(1)}</p>
      </div>
    </div>
  );
}
