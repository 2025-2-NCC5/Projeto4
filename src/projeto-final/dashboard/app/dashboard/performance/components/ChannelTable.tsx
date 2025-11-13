"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChannelTable() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/performance-by-city").then((res) => setData(res.data));
  }, []);

  if (!data.length) return <p>Carregando dados por canal...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Pedidos por Cidade (Canal)</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Cidade</th>
            <th>Pedidos</th>
            <th>Ticket Médio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{row.city}</td>
              <td>{row.pedidos}</td>
              <td> R$ {row.ticket_medio ? Number(row.ticket_medio).toFixed(2) : "0.00"} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
