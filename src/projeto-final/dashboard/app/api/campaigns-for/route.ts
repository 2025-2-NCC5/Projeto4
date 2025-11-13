import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json([]);

  const cliente = await prisma.customers.findUnique({
    where: { id },
    include: {
      orders: {
        select: {
          order_value: true,
          created_at: true,
          nps_score: true,
        },
      },
    },
  });

  if (!cliente) return NextResponse.json([]);

  const totalPedidos = cliente.orders.length;
  const valorMedio =
    cliente.orders.reduce((acc, o) => acc + Number(o.order_value), 0) / totalPedidos || 0;

  const horario = (() => {
    const horas = cliente.orders.map((o) => new Date(o.created_at!).getHours());
    const media = horas.reduce((a, b) => a + b, 0) / horas.length;
    return media >= 18 ? "noite" : media >= 12 ? "tarde" : "manhã";
  })();

  const nps = Math.round(
    cliente.orders.reduce((acc, o) => acc + (o.nps_score || 0), 0) / totalPedidos || 0
  );

  const res = await fetch("http://localhost:8000/recomendar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      nome: cliente.name,
      cidade: cliente.city || "",
      total_pedidos: totalPedidos,
      valor_medio: valorMedio,
      horario,
      nps,
    }),
  });

  const campanhas = await res.json();
  return NextResponse.json(campanhas);
}
