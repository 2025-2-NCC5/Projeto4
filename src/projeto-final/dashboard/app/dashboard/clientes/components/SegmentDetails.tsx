"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const segments = ["VIP", "Leal", "Ocasional", "Raro"];

export default function SegmentDetails() {
  const [selected, setSelected] = useState("VIP");
  const [data, setData] = useState<any[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/segment-details?segment=${selected}`)
      .then((res) => setData(res.data));
  }, [selected]);

  const visibleRows = expanded ? data : data.slice(0, 5);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Detalhes do Segmento</h2>

      <div className="flex gap-4 mb-4">
        {segments.map((s) => (
          <button
            key={s}
            onClick={() => {
              setSelected(s);
              setExpanded(false); // reseta ao trocar de segmento
            }}
            className={`px-4 py-2 rounded ${
              selected === s ? "bg-[#F26A21] text-white" : "bg-gray-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Frequência</th>
            <th>LTV</th>
            <th>Último Pedido (dias)</th>
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{row.name}</td>
              <td>{Number(row.freq)}</td>
              <td>R$ {Number(row.ltv).toFixed(2)}</td>
              <td>{row.daysSince} dias</td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length > 5 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#F26A21] hover:underline"
          >
            {expanded ? "Mostrar menos ▲" : "Mostrar mais ▼"}
          </button>
        </div>
      )}
    </div>
  );
}
