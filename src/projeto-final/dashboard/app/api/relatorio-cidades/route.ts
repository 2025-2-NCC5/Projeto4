import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<{
    city: string;
    clientes: bigint;
    pedidos: bigint;
    nps: number;
    engajamento: number;
  }[]>`
    SELECT c.city,
           COUNT(DISTINCT c.id) AS clientes,
           COUNT(o.id) AS pedidos,
           ROUND(AVG(o.nps_score)::numeric, 1) AS nps,
           COUNT(o.id)::float / COUNT(DISTINCT c.id) AS engajamento
    FROM customers c
    LEFT JOIN orders o ON o.customer_id = c.id
    GROUP BY c.city
    ORDER BY pedidos DESC;
  `;

  const safeRows = rows.map((r) => ({
    city: r.city,
    clientes: Number(r.clientes),
    pedidos: Number(r.pedidos),
    nps: r.nps,
    engajamento: r.engajamento,
  }));

  return Response.json(safeRows);
}
