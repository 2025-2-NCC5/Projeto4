"use client";
import { useEffect, useState } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ClustersPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/clusters").then(r => r.json()).then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">🎯 Clusterização de Clientes</h1>

      {/* Scatter */}
      <div className="p-6 bg-white rounded-lg shadow mb-6">
        <h2 className="text-lg font-medium mb-4">Distribuição (LTV x Frequência)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart>
            <XAxis dataKey="ltv" />
            <YAxis dataKey="freq" />
            <Tooltip />
            <Scatter data={data} fill="#F26A21" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Clientes por Cluster</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th>Cliente</th><th>LTV</th><th>Freq</th><th>Cluster</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c:any, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td>{c.name}</td>
                <td>R$ {c.ltv.toFixed(2)}</td>
                <td>{c.freq}</td>
                <td>{c.cluster}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}