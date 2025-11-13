import ChannelTable from "./components/ChannelTable";
import DeliveryTimeChart from "./components/DeliveryTimeChart";
import AbandonRate from "./components/AbandonRate";

export default function PerformancePage() {
  return (
    <main className="min-h-screen bg-[#EFE9DD] text-[#3A2F2A] p-8 space-y-8">
      <h1 className="text-3xl font-bold">📈 Performance por Canal</h1>
      <AbandonRate />
      <ChannelTable />
      <DeliveryTimeChart />
      
    </main>
  );
}
