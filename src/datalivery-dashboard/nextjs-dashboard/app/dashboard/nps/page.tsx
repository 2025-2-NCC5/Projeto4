"use client";
import { useEffect, useState } from "react";

export default function NPSPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/nps").then(r => r.json()).then(setData);
  }, []);

  if (!data) return <div>Carregando...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">⭐ Net Promoter Score (NPS)</h1>

      <div className="text-center p-6 bg-white shadow rounded-lg mb-6">
        <p className="text-6xl font-bold text-[#F26A21]">{data.nps.toFixed(1)}</p>
        <p className="opacity-70">NPS Geral</p>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-green-100 rounded-lg">Promotores: {data.promoters}</div>
        <div className="p-4 bg-yellow-100 rounded-lg">Neutros: {data.passives}</div>
        <div className="p-4 bg-red-100 rounded-lg">Detratores: {data.detractors}</div>
      </div>
    </div>
  );
}