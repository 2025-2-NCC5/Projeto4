import KpiCards from "./KpiCards"
import RankingTable from "./RankingTable"
import NpsChart from "./NpsChart"
import OrdersPerMonthChart from "./OrdersPerMonthChart"
import SegmentsChart from "./SegmentsChart"

export default function Page() {
  return (
    <div className="space-y-12">
      <KpiCards />
      <OrdersPerMonthChart />
      <SegmentsChart />
      <RankingTable />
      <NpsChart />
    </div>
  )
}