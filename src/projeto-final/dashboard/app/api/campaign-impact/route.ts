import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const segment = searchParams.get("segment");

  if (!segment) return NextResponse.json({});

  const customers = await prisma.customers.findMany({
    where: { city: segment }, // usando city como critério de segmentação
    select: { id: true },
  });

  const targetCount = customers.length;
  const conversionRate = 0.12;
  const avgRevenue = 450;

  const estimatedRevenue = targetCount * conversionRate * avgRevenue;

  return NextResponse.json({
    targetCount,
    conversionRate,
    estimatedRevenue,
  });
}
