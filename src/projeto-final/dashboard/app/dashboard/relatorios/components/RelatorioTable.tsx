"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RelatorioTable() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/relatorio-cidades").then((res) => setRows(res.data));
  }, []);

  const exportCSV = () => {
    const header = "Cidade,Clientes,Pedidos,NPS Médio,Engajamento (%)";
    const content = rows
      .map((r) => `${r.city},${r.clientes},${r.pedidos},${r.nps},${(r.engajamento * 100).toFixed(1)}`)
      .join("\n");
    const blob = new Blob([`${header}\n${content}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio.csv";
    a.click();
  };

  if (!rows.length) return <p>Carregando relatório...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Métricas por Cidade</h2>
        <button
          onClick={exportCSV}
          className="bg-[#F26A21] text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Exportar CSV
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#F5F5F5]">
            <th className="text-left p-2">Cidade</th>
            <th className="text-left p-2">Clientes</th>
            <th className="text-left p-2">Pedidos</th>
            <th className="text-left p-2">NPS Médio</th>
            <th className="text-left p-2">Engajamento (%)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{r.city}</td>
              <td className="p-2">{r.clientes}</td>
              <td className="p-2">{r.pedidos}</td>
              <td className="p-2">{r.nps}</td>
              <td className="p-2">{(r.engajamento * 100).toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
