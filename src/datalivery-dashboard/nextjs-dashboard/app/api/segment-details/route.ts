import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const segment = searchParams.get("segment");

  if (!segment) {
    return new Response("Missing segment", { status: 400 });
  }

  const rows = await prisma.$queryRaw<{
    name: string;
    freq: number;
    ltv: number;
    last_order: Date | null;
  }[]>`
    SELECT c.name,
           COUNT(o.id)::float AS freq,
           SUM(o.order_value)::float AS ltv,
           MAX(o.created_at) AS last_order
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.name;
  `;

  // Segmentação usada anteriormente
  function getSegment(ltv: number, freq: number) {
    if (ltv >= 800 && freq >= 10) return "VIP";
    if (ltv >= 400 && freq >= 5) return "Leal";
    if (ltv >= 100 && freq >= 2) return "Ocasional";
    return "Raro";
  }

  const filtered = rows
    .map(r => ({
      ...r,
      segment: getSegment(r.ltv, r.freq),
      daysSince: r.last_order
        ? Math.floor((Date.now() - new Date(r.last_order).getTime()) / (1000*60*60*24))
        : 999
    }))
    .filter(r => r.segment === segment);

  return Response.json(filtered);
}
