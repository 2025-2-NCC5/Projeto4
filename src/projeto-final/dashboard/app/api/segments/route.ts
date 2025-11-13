import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const customers = await prisma.customers.findMany({
    include: {
      orders: {
        select: {
          nps_score: true,
        },
      },
    },
  });

  const segments = {
    VIP: 0,
    Leal: 0,
    Ocasional: 0,
    Raro: 0,
  };

  for (const customer of customers) {
    const totalPedidos = customer.orders.length;
    const npsList = customer.orders.map((o) => o.nps_score).filter((n) => typeof n === "number");
    const npsMedio = npsList.length ? npsList.reduce((a, b) => a + b, 0) / npsList.length : 0;

    if (totalPedidos > 20 && npsMedio >= 9) {
      segments.VIP++;
    } else if (totalPedidos > 10 && npsMedio >= 7) {
      segments.Leal++;
    } else if (totalPedidos >= 3) {
      segments.Ocasional++;
    } else {
      segments.Raro++;
    }
  }

  const result = Object.entries(segments).map(([name, value]) => ({ name, value }));
  return NextResponse.json(result);
}
