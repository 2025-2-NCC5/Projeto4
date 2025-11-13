"use client"
import { useEffect, useState } from "react"

export default function RankingTable() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/ranking")
      const json = await res.json()
      setData(json)
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <p>Carregando...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ranking de Clientes</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b font-medium">
            <th className="p-2 text-left">Cliente</th>
            <th className="p-2 text-left">Total Gasto (R$)</th>
            <th className="p-2 text-left">Pedidos</th>
            <th className="p-2 text-left">Ticket Médio (R$)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-neutral-100">
              <td className="p-2">{row.name}</td>
              <td className="p-2">{row.total_gasto.toFixed(2)}</td>
              <td className="p-2">{row.total_pedidos}</td>
              <td className="p-2">{row.ticket_medio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}