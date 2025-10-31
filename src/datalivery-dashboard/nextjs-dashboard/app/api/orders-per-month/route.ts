import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
  const rows = await prisma.$queryRaw<
    { mes: Date; total_pedidos: number }[]
  >`
    SELECT
      DATE_TRUNC('month', created_at) AS mes,
      COUNT(*) AS total_pedidos
    FROM orders
    GROUP BY mes
    ORDER BY mes;
  `

  const data = rows.map(r => ({
    mes: r.mes.toISOString().slice(0, 7), // Ex: "2025-05"
    total_pedidos: Number(r.total_pedidos)
  }))

  return Response.json(data)
}