"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SegmentChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/segments").then((res) => setData(res.data));
  }, []);

  if (!data.length) return <p>Carregando segmentação...</p>;

  const counts = data.reduce((acc, cur) => {
    acc[cur.segment] = (acc[cur.segment] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Distribuição por Segmento</h2>
      <ul className="list-disc pl-5 space-y-1">
        {Object.entries(counts).map(([segment, count]) => (
          <li key={segment}>
            {segment}: {count ? Number(count) : 0} clientes
          </li>
        ))}
      </ul>
    </div>
  );
}
