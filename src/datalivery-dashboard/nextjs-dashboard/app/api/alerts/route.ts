import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<{
    name: string;
    daysSince: number;
    freq: number;
    ltv: number;
  }[]>`
    SELECT 
      c.name,
      COUNT(o.id)::int AS freq,
      SUM(o.order_value)::float AS ltv,
      EXTRACT(DAY FROM NOW() - MAX(o.created_at))::int AS "daysSince"
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.id
    ORDER BY "daysSince" DESC;
  `;

  const alerts = rows
    .map(r => {
      if (r.daysSince > 60 && r.freq > 3) {
        return `🔥 Cliente ${r.name} está sumido há ${r.daysSince} dias, mas era frequente (${r.freq} pedidos). Sugira resgate.`;
      }
      if (r.ltv > 800 && r.daysSince > 30) {
        return `⚠️ Cliente VIP ${r.name} está inativo há ${r.daysSince} dias. Ofereça benefício exclusivo.`;
      }
      return null;
    })
    .filter(Boolean);

  return Response.json(alerts.slice(0, 6));
}
