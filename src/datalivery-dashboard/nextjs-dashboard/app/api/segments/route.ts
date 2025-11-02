import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
  const rows = await prisma.$queryRaw<
    { name: string; ltv: number; freq: number }[]
  >`
    SELECT
      c.name,
      SUM(o.order_value) AS ltv,
      COUNT(o.id) AS freq
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.name;
  `

  const data = rows.map(r => {
    const ltv = Number(r.ltv)
    const freq = Number(r.freq)

    let segmento = "Raro"
    if (ltv >= 800 && freq >= 10) segmento = "VIP"
    else if (ltv >= 400 && freq >= 5) segmento = "Leal"
    else if (ltv >= 100 && freq >= 2) segmento = "Ocasional"

    return { segmento }
  })

  const counts = data.reduce((acc, cur) => {
    acc[cur.segmento] = (acc[cur.segmento] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Response.json([
    { name: "VIP", value: counts["VIP"] ?? 0 },
    { name: "Leal", value: counts["Leal"] ?? 0 },
    { name: "Ocasional", value: counts["Ocasional"] ?? 0 },
    { name: "Raro", value: counts["Raro"] ?? 0 },
  ])
}