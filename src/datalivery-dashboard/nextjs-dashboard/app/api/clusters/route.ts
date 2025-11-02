import { PrismaClient } from "@prisma/client";
import kmeans from "ml-kmeans";

const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<
    { name: string; ltv: number; freq: number }[]
  >`
    SELECT c.name,
           SUM(o.order_value)::float AS ltv,
           COUNT(o.id)::float AS freq
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.name;
  `;

  const data = rows.map(r => [r.ltv, r.freq]);
  const { clusters } = kmeans(data, 4);

  const labels = ["Raro", "Ocasional", "Leal", "VIP"];

  return Response.json(
    rows.map((r, i) => ({
      ...r,
      cluster: labels[clusters[i]]
    }))
  );
}