// Página: Simulador de Campanhas

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<{
    name: string;
    ltv: number;
    freq: number;
    daysSince: number;
  }[]>`
    SELECT
      c.name,
      SUM(o.order_value)::float AS ltv,
      COUNT(o.id)::int AS freq,
      EXTRACT(DAY FROM NOW() - MAX(o.created_at))::int AS "daysSince"
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.name
    ORDER BY "daysSince" DESC
    LIMIT 50;
  `;

  const data = rows.map(r => {
    let campaign = "Reengajamento";
    if (r.freq >= 8 && r.ltv >= 600) campaign = "VIP: Experiência Exclusiva";
    else if (r.freq >= 4 && r.daysSince < 15) campaign = "Fidelização";
    else if (r.daysSince > 45) campaign = "Resgate com Desconto Forte";

    return { ...r, campaign };
  });

  return Response.json(data);
}
