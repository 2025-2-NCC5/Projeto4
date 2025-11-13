"use client";
import { useState } from "react";
import CustomerSearch from "./components/CustomerSearch";
import CampaignMessages from "./components/CampaignMessages";

export default function CampanhasPage() {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");

  return (
    <main className="min-h-screen bg-[#EFE9DD] text-[#3A2F2A] p-8 space-y-8">
      <h1 className="text-3xl font-bold">🎯 Simulador de Campanhas</h1>
      <CustomerSearch onSelect={(id, name) => {
        setCustomerId(id);
        setCustomerName(name);
      }} />
      {customerId && <CampaignMessages customerId={customerId} customerName={customerName} />}
    </main>
  );
}
