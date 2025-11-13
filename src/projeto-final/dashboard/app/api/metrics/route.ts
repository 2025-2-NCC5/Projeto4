// Página: Visão Geral

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const result = await prisma.$queryRaw<{
    total_customers: bigint;
    total_orders: bigint;
    avg_ticket: number;
    avg_nps: number;
  }[]>`
    SELECT
      (SELECT COUNT(*) FROM customers) AS total_customers,
      (SELECT COUNT(*) FROM orders) AS total_orders,
      (SELECT AVG(order_value) FROM orders) AS avg_ticket,
      (SELECT AVG(nps_score) FROM orders) AS avg_nps;
  `;

  const row = result[0];

  return Response.json({
    totalCustomers: Number(row.total_customers),
    totalOrders: Number(row.total_orders),
    avgTicket: Number(row.avg_ticket),
    avgNps: Number(row.avg_nps),
  });
}
