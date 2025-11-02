"use client"
import { useEffect, useState } from "react"

export default function KpiCards() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/metrics")
      .then(res => res.json())
      .then(setData)
  }, [])

  if (!data) return <p>Carregando KPIs...</p>

  const cards = [
    { label: "Clientes", value: data.total_customers },
    { label: "Pedidos", value: data.total_orders },
    { label: "Ticket Médio (R$)", value: data.avg_ticket.toFixed(2) },
    { label: "NPS Geral", value: data.avg_nps.toFixed(0) },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {cards.map((c, i) => (
        <div key={i} className="border rounded-lg p-4 shadow-sm bg-white">
          <div className="text-sm text-gray-500">{c.label}</div>
          <div className="text-2xl font-semibold">{c.value}</div>
        </div>
      ))}
    </div>
  )
}