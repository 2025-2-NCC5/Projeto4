import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    if (!question || question.trim() === "") {
      return NextResponse.json({ answer: "Digite uma pergunta." });
    }

    const q = question.toLowerCase();

    // ----- 1) Regras Inteligentes Baseadas em Dados -----

    // Clientes em risco
    if (q.includes("risco") || q.includes("pararam de comprar")) {
      const rows = await prisma.$queryRaw<{
        name: string;
        days: number;
      }[]>`
        SELECT c.name,
               EXTRACT(DAY FROM NOW() - MAX(o.created_at))::int AS days
        FROM customers c
        LEFT JOIN orders o ON o.customer_id = c.id
        GROUP BY c.id
        HAVING EXTRACT(DAY FROM NOW() - MAX(o.created_at)) > 30
        ORDER BY days DESC;
      `;

      return NextResponse.json({
        answer: rows.length
          ? `Clientes em risco:\n${rows.map(r => `• ${r.name} — ${r.days} dias sem comprar`).join("\n")}`
          : "Nenhum cliente em risco encontrado."
      });
    }

    // Clientes leais (freq >= 5 + ticket alto)
    if (q.includes("leal") || q.includes("fidel")) {
      const rows = await prisma.$queryRaw<{
        name: string;
        freq: number;
        ltv: number;
      }[]>`
        SELECT c.name,
               COUNT(o.id) AS freq,
               SUM(o.order_value) AS ltv
        FROM customers c
        JOIN orders o ON o.customer_id = c.id
        GROUP BY c.id
        HAVING COUNT(o.id) >= 5
        ORDER BY ltv DESC;
      `;

      return NextResponse.json({
        answer: rows.length
          ? `Clientes leais:\n${rows.map(r => `• ${r.name} — ${r.freq} pedidos — LTV R$ ${r.ltv}`).join("\n")}`
          : "Nenhum cliente leal encontrado."
      });
    }

    // Recomendação de campanhas (regra baseada em comportamento)
    if (q.includes("campanha") || q.includes("promoção")) {
      const rows = await prisma.$queryRaw<{
        name: string;
        freq: number;
        days: number;
      }[]>`
        SELECT c.name,
               COUNT(o.id) AS freq,
               EXTRACT(DAY FROM NOW() - MAX(o.created_at))::int AS days
        FROM customers c
        LEFT JOIN orders o ON o.customer_id = c.id
        GROUP BY c.id
        ORDER BY days DESC, freq ASC
        LIMIT 10;
      `;

      return NextResponse.json({
        answer: rows.length
          ? "Sugestão de campanhas:\n" + rows.map(r => {
              let type = r.days > 45 ? "Desconto Forte 🔥" :
                         r.days > 20 ? "Re-conexão 💌" :
                         r.freq >= 5 ? "VIP Exclusivo 👑" :
                         "Cupom Padrão 🎁";
              return `• ${r.name} — ${type} — ${r.days} dias sem comprar`;
            }).join("\n")
          : "Não encontrei dados suficientes para sugerir campanhas."
      });
    }

    // ----- 2) Inteligência Avançada (Gemini com contexto real) -----
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({
      contents: [
        {
          role: "system",
          parts: [{
            text: `Você é um consultor especialista em gestão de restaurantes, CRM e fidelização de clientes.
Responda sempre em tom profissional, claro, direto, explicando o raciocínio de forma simples.
Se não tiver dados suficientes, explique o que seria necessário medir ou consultar.`
          }]
        },
        {
          role: "user",
          parts: [{ text: question }]
        }
      ]
    });

    const answer = result.response.text()?.trim() ?? "";

    if (!answer) throw new Error("Resposta vazia do modelo");

    return NextResponse.json({ answer });

  } catch (err) {
    console.error("CHATBOT ERROR:", err);
    return NextResponse.json({
      answer: "Não consegui interpretar agora, mas posso tentar novamente se reformular a pergunta."
    });
  }
}
