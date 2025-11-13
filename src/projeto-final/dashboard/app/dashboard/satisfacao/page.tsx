import NpsChart from "./components/NpsChart";
import EngagementChart from "./components/EngagementChart";

export default function SatisfacaoPage() {
  return (
    <main className="min-h-screen bg-[#EFE9DD] text-[#3A2F2A] p-8 space-y-8">
      <h1 className="text-3xl font-bold">📣 Satisfação & Engajamento</h1>
      <NpsChart />
      <EngagementChart />
    </main>
  );
}
