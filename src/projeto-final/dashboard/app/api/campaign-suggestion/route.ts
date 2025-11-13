import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const segment = searchParams.get("segment");

  if (!segment) return NextResponse.json([]);

  const customers = await prisma.customers.findMany({
    where: { city: segment }, // usando city como critério de segmentação
    select: {
      name: true,
      email: true,
    },
  });

  const data = customers.map((c) => ({
    name: c.name,
    campaign: c.email?.includes("@gmail.com")
      ? "Campanha para Gmail"
      : "Campanha Genérica",
  }));

  return NextResponse.json(data);
}
