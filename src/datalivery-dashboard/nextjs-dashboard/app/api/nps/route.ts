import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const rows = await prisma.$queryRaw<{ score: number }[]>`
    SELECT score FROM nps_responses;
  `;

  const promoters = rows.filter(r => r.score >= 9).length;
  const passives = rows.filter(r => r.score >= 7 && r.score <= 8).length;
  const detractors = rows.filter(r => r.score <= 6).length;
  const total = rows.length;

  const nps = ((promoters - detractors) / total) * 100;

  return Response.json({ nps, promoters, passives, detractors, total });
}