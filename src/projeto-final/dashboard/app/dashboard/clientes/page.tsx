import RankingTable from "./components/RankingTable";
import SegmentChart from "./components/SegmentChart";
import SegmentDetails from "./components/SegmentDetails";

export default function ClientesPage() {
  return (
    <main className="min-h-screen bg-[#EFE9DD] text-[#3A2F2A] p-8 space-y-8">
      <h1 className="text-3xl font-bold">👥 Inteligência de Clientes</h1>
      <SegmentDetails />
      <SegmentChart />
      <RankingTable />
    </main>
  );
}
