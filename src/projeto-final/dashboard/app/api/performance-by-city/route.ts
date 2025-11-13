import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<{
    city: string;
    pedidos: number;
    ticket_medio: number;
  }[]>`
    SELECT c.city,
           COUNT(o.id)::int AS pedidos,
           ROUND(AVG(o.order_value)::numeric, 2) AS ticket_medio
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    GROUP BY c.city
    ORDER BY pedidos DESC;
  `;

  return Response.json(rows);
}
