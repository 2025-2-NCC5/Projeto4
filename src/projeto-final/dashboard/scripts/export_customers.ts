import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const customers = await prisma.customers.findMany({
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

  const rows = customers.map((c) => {
    const totalPedidos = c.orders.length;
    const valorMedio =
      c.orders.reduce((acc, o) => acc + Number(o.order_value), 0) / totalPedidos || 0;

    const horario = (() => {
      const horas = c.orders.map((o) => new Date(o.created_at!).getHours());
      const media = horas.reduce((a, b) => a + b, 0) / horas.length;
      return media >= 18 ? "noite" : media >= 12 ? "tarde" : "manhã";
    })();

    const nps = Math.round(
      c.orders.reduce((acc, o) => acc + (o.nps_score || 0), 0) / totalPedidos || 0
    );

    return {
      id: c.id,
      nome: c.name,
      cidade: c.city || "",
      total_pedidos: totalPedidos,
      valor_medio: valorMedio.toFixed(2),
      horario,
      nps,
    };
  });

  const header = "id,nome,cidade,total_pedidos,valor_medio,horario,nps";
  const content = rows.map((r) => Object.values(r).join(",")).join("\n");
  const filePath = path.join(__dirname, "../campaign-recommender/data.csv");

  fs.writeFileSync(filePath, `${header}\n${content}`);
  console.log("Dados exportados para:", filePath);
}

main();
