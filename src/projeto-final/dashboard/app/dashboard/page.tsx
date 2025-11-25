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

      {/* Componentes principais */}
      <KpiCards cidade={cidade} periodo={periodo} />
      <RevenueChart cidade={cidade} periodo={periodo} />
      <AlertsList cidade={cidade} periodo={periodo} />
      <CampaignSuggestions cidade={cidade} periodo={periodo} />
    </main>
  );
}
