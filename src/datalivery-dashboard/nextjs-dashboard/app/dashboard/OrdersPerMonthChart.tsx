"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function OrdersPerMonthChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/orders-per-month")
      const json = await res.json()
      setData(json)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p>Carregando gráfico...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Pedidos por Mês</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total_pedidos" stroke="currentColor" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}