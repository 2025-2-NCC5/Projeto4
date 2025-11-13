// Página: Inteligência de Clientes

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<
    { name: string; total_gasto: bigint; total_pedidos: bigint; ticket_medio: number }[]
  >`
    SELECT
      c.name,
      SUM(o.order_value) AS total_gasto,
      COUNT(o.id) AS total_pedidos,
      AVG(o.order_value) AS ticket_medio
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.name
    ORDER BY total_gasto DESC
    LIMIT 20;
  `;

  const data = rows.map(r => ({
    name: r.name,
    totalSpent: Number(r.total_gasto),
    totalOrders: Number(r.total_pedidos),
    avgTicket: Number(r.ticket_medio),
  }));

  return Response.json(data);
}
