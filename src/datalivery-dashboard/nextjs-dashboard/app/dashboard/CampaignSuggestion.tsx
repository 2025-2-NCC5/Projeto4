"use client";
import { useEffect, useState } from "react";

export default function CampaignSuggestion() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
  fetch("/api/campaign-suggestion")
    .then(async r => {
      if (!r.ok) throw new Error("API error");
      return r.json();
    })
    .then(setData)
    .catch(() => setData([]));
}, []);

  if (!data.length) return <p>Carregando recomendações...</p>;
  

  const top = data[0]; // cliente mais "urgente"

  return (
    <div className="p-6 bg-white rounded-lg shadow border mb-8">
      <h2 className="text-2xl font-semibold mb-4">📢 Campanha Recomendada Agora</h2>

      <p className="text-lg">
        Sugerimos <strong>{top.campaign}</strong> para:
      </p>

      <div className="mt-3 text-xl font-bold text-[#F26A21]">
        {top.name}
      </div>

      <p className="text-sm opacity-70 mt-1">
        Última compra há <strong>{top.daysSince} dias</strong> — {top.freq} pedidos no histórico — LTV R$ {top.ltv.toFixed(2)}
      </p>

      <hr className="my-4" />

      <h3 className="text-lg mb-2 font-medium">Outros clientes recomendados:</h3>
      <ul className="space-y-1">
        {data.slice(1, 8).map((c,i) => (
          <li key={i} className="text-sm">
            • {c.name} — {c.daysSince} dias sem comprar — {c.campaign}
          </li>
        ))}
      </ul>
    </div>
  );
}
