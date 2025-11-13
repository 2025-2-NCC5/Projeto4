import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const totalCustomers = await prisma.customers.count();
  const activeCustomers = await prisma.$queryRaw<{ count: number }[]>`
    SELECT COUNT(DISTINCT customer_id) AS count FROM orders;
  `;

  const rate = 1 - (Number(activeCustomers[0].count) / totalCustomers);

  return Response.json({ rate });
}
