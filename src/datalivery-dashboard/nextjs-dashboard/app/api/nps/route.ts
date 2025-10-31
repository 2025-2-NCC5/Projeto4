import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
  const rows = await prisma.$queryRaw<
    { name: string; nps_medio: number }[]
  >`
    SELECT
      r.name,
      AVG(o.nps_score) AS nps_medio
    FROM restaurants r
    JOIN orders o ON o.restaurant_id = r.id
    GROUP BY r.name
    ORDER BY nps_medio DESC;
  `

  // Converte para número
  const data = rows.map(r => ({
    name: r.name,
    nps_medio: Number(r.nps_medio)
  }))

  return Response.json(data)
}