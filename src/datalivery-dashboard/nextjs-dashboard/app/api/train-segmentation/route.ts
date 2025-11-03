import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function classify(ltv: number, freq: number) {
  if (ltv >= 800 && freq >= 10) return "VIP";
  if (ltv >= 400 && freq >= 5) return "Leal";
  if (ltv >= 100 && freq >= 2) return "Ocasional";
  return "Raro";
}

export async function GET() {
  const rows = await prisma.$queryRaw<
    { id: string; name: string; ltv: number; freq: number }[]
  >`
    SELECT 
      c.id,
      c.name,
      SUM(o.order_value)::float AS ltv,
      COUNT(o.id)::float AS freq
    FROM customers c
    LEFT JOIN orders o ON o.customer_id = c.id
    GROUP BY c.id, c.name;
  `;

  const segmented = rows.map(r => ({
    id: r.id,
    name: r.name,
    ltv: Number(r.ltv) || 0,
    freq: Number(r.freq) || 0,
    segment: classify(Number(r.ltv) || 0, Number(r.freq) || 0)
  }));

  return Response.json(segmented);
}
