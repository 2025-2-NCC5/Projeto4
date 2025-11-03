import KpiCards from "./KpiCards"
import RankingTable from "./RankingTable"
import NpsChart from "./NpsChart"
import OrdersPerMonthChart from "./OrdersPerMonthChart"
import SegmentsChart from "./SegmentsChart"
import CampaignSuggestion from "./CampaignSuggestion"
import Alerts from "./Alerts";

export default function Page() {
  return (
    <div className="space-y-12">
      <KpiCards />
      <Alerts />
      <CampaignSuggestion />
      <OrdersPerMonthChart />
      <SegmentsChart />
      <RankingTable />
      <NpsChart />
    </div>
  )
}