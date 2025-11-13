import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<{
    city: string;
    engajamento: number;
  }[]>`
    SELECT c.city,
           COUNT(o.id)::float / COUNT(DISTINCT c.id) AS engajamento
    FROM customers c
    LEFT JOIN orders o ON o.customer_id = c.id
    GROUP BY c.city
    ORDER BY engajamento DESC;
  `;

  return Response.json(rows);
}
