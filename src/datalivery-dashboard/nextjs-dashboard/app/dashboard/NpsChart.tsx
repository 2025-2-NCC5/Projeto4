"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function NpsChart() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/nps")
      const json = await res.json()
      setData(json)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p>Carregando gráfico...</p>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">NPS por Restaurante</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[-100, 100]} />
          <Tooltip />
          <Bar dataKey="nps_medio" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}