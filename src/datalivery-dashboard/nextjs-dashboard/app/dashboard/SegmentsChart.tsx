"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#2563eb", "#16a34a", "#fbbf24", "#dc2626"]

export default function SegmentsChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/segments")
      .then(r => r.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Carregando segmentação...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Segmentação de Clientes</h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={120}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}