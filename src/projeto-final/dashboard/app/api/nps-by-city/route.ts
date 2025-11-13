import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<{
    city: string;
    nps: number;
  }[]>`
    SELECT c.city,
           ROUND(AVG(o.nps_score)::numeric, 1) AS nps
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    GROUP BY c.city
    ORDER BY nps DESC;
  `;

  return Response.json(rows);
}
