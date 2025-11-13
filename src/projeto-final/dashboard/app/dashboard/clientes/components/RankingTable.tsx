"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RankingTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/ranking").then((res) => setData(res.data));
  }, []);

  if (!data.length) return <p>Carregando ranking...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Ranking de Clientes</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Nome</th>
            <th>Total Gasto</th>
            <th>Pedidos</th>
            <th>Ticket Médio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{row.name}</td>
              <td>R$ {row.totalSpent ? Number(row.totalSpent).toFixed(2) : "0.00"}</td>
              <td>{row.totalOrders ?? 0}</td>
              <td>R$ {row.avgTicket ? Number(row.avgTicket).toFixed(2) : "0.00"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
