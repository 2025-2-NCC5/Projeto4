import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<{
    city: string;
    tempo_medio: number;
  }[]>`
    SELECT c.city,
           ROUND(AVG(o.delivery_time_minutes)::numeric, 2) AS tempo_medio
    FROM orders o
    JOIN customers c ON o.customer_id = c.id
    GROUP BY c.city
    ORDER BY tempo_medio DESC;
  `;

  return Response.json(rows);
}
