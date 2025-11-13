"use client";
import { useState } from "react";
import KpiCards from "./components/KpiCards";
import RevenueChart from "./components/RevenueChart";
import AlertsList from "./components/AlertsList";
import CampaignSuggestions from "./components/CampaignSuggestions";

export default function DashboardPage() {
  const [cidade, setCidade] = useState("");
  const [periodo, setPeriodo] = useState("30");

  return (
    <main className="min-h-screen bg-[#EFE9DD] text-[#3A2F2A] p-8 space-y-8">
      {/* Escrita de direcionamento */}
      <div>
        <h1 className="text-3xl font-bold">📊 Visão Geral</h1>
        <p className="text-lg mt-2">
          Aqui está o panorama completo da sua operação. Use os filtros abaixo para refinar os insights.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <select
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="border rounded px-3 py-2 bg-white text-[#3A2F2A]"
        >
          <option value="">Todas as cidades</option>
          <option value="São Paulo">São Paulo</option>
          <option value="Campinas">Campinas</option>
          <option value="Rio de Janeiro">Rio de Janeiro</option>
        </select>

        <select
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="border rounded px-3 py-2 bg-white text-[#3A2F2A]"
        >
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
        </select>
      </div>

      {/* Componentes principais */}
      <KpiCards cidade={cidade} periodo={periodo} />
      <RevenueChart cidade={cidade} periodo={periodo} />
      <AlertsList cidade={cidade} periodo={periodo} />
      <CampaignSuggestions cidade={cidade} periodo={periodo} />
    </main>
  );
}
