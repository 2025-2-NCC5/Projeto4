// Página: Métricas de Satisfação

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const data = await prisma.$queryRaw<
      { restaurant: string; nps: number }[]
    >`
      SELECT
        r.name AS restaurant,
        (
          (SUM(CASE WHEN o.nps_score >= 9 THEN 1 ELSE 0 END) -
           SUM(CASE WHEN o.nps_score <= 6 THEN 1 ELSE 0 END))
          * 100.0 / COUNT(o.id)
        ) AS nps
      FROM orders o
      JOIN restaurants r ON r.id = o.restaurant_id
      WHERE o.nps_score IS NOT NULL
      GROUP BY r.name
      ORDER BY r.name;
    `;

    return Response.json(data);

  } catch (err) {
    console.error("API ERROR /nps-by-restaurant:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
