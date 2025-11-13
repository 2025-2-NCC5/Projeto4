// Página: Visão Geral (gráfico de tendência)

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.$queryRaw<
      { month: string; total: number }[]
    >`
      SELECT
        TO_CHAR(o.created_at, 'YYYY-MM') AS month,
        SUM(o.order_value)::float AS total
      FROM orders o
      GROUP BY month
      ORDER BY month;
    `;

    return Response.json(data);

  } catch (err) {
    console.error("API ERROR /orders-per-month:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
