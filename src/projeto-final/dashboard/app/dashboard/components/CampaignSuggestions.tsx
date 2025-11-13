"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CampaignSuggestions() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/campaign-suggestion").then((res) => setData(res.data));
  }, []);

  if (!data.length) return null;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Sugestões de Campanha</h2>
      <ul className="list-disc pl-5 space-y-1">
        {data.slice(0, 5).map((item, i) => (
          <li key={i}>
            {item.name} — {item.campaign}
          </li>
        ))}
      </ul>
    </div>
  );
}
