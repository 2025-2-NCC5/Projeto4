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

    // ----- Regras inteligentes antes da IA -----

    if (question.toLowerCase().includes("risco")) {
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

    // ----- Chamado correto do Gemini -----
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `Você é um consultor de restaurantes. Pergunta: ${question}` }]
        }
      ]
    });

    const answer = result.response.text(); // <— Aqui é a forma correta de pegar o texto

    return NextResponse.json({ answer });

  } catch (err) {
    console.error("CHATBOT ERROR:", err);
    return NextResponse.json({ answer: "Erro ao processar resposta." }, { status: 500 });
  }
}
