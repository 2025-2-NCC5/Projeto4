import KpiCards from "./components/KpiCards";
import RevenueChart from "./components/RevenueChart";
import AlertsList from "./components/AlertsList";
import CampaignSuggestions from "./components/CampaignSuggestions";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#EFE9DD] text-[#3A2F2A] p-8 space-y-8">
      <h1 className="text-3xl font-bold">📊 Visão Geral</h1>
      <KpiCards />
      <RevenueChart />
      <AlertsList />
      <CampaignSuggestions />
    </main>
  );
}
