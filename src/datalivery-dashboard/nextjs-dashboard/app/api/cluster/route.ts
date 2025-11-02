import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export async function GET() {
  const rows = await prisma.$queryRaw`
    SELECT c.name,
           SUM(o.order_value) AS ltv,
           COUNT(o.id) AS freq
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.name;
  `
  return Response.json(rows)
}