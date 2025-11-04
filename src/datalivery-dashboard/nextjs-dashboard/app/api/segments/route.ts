import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<
    { name: string; ltv: number; freq: number }[]
  >`
    SELECT
      c.name,
      SUM(o.order_value)::float AS ltv,
      COUNT(o.id)::float AS freq
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.id, c.name;
  `;

  const data = rows.map(r => {
    const ltv = r.ltv;
    const freq = r.freq;

    let segment = "Raro";
    if (ltv >= 800 && freq >= 10) segment = "VIP";
    else if (ltv >= 400 && freq >= 5) segment = "Leal";
    else if (ltv >= 100 && freq >= 2) segment = "Ocasional";

    return { name: r.name, ltv, freq, segment };
  });

  return Response.json(data);
}
