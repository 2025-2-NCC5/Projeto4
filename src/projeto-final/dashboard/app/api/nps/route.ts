// Página: Métricas de Satisfação

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<{ score: number }[]>`
      SELECT nps_score AS score
      FROM orders
      WHERE nps_score IS NOT NULL;
    `;

    if (rows.length === 0) {
      return Response.json({
        nps: 0,
        promoters: 0,
        neutrals: 0,
        detractors: 0,
        total: 0,
      });
    }

    const promoters = rows.filter(r => r.score >= 9).length;
    const neutrals = rows.filter(r => r.score === 7 || r.score === 8).length;
    const detractors = rows.filter(r => r.score <= 6).length;
    const total = rows.length;

    const nps = ((promoters - detractors) / total) * 100;

    return Response.json({
      nps,
      promoters,
      neutrals,
      detractors,
      total
    });

  } catch (err) {
    console.error("API ERROR /nps:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
