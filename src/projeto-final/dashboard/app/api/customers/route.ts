import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const name = new URL(req.url).searchParams.get("name");
  if (!name) return Response.json([]);

  const results = await prisma.customers.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      name: true,
    },
    take: 10,
  });

  return Response.json(results);
}
