// Página inicial, antes de entrar no dashboard de fato:

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#EFE9DD] text-[#3A2F2A] p-8">

      <div className="text-center max-w-3xl">
        <Image
          src="/datalivery-logo-sem-fundo.png"
          alt="Datalivery Logo"
          width={320}
          height={300}
          className="mx-auto mb-6"
        />

        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Datalivery</h1>

        <p className="text-lg mb-6 opacity-90">
          Plataforma de inteligência de dados para negócios do ramo alimentício.
          Acesse painéis interativos, métricas estratégicas e sugestões inteligentes para impulsionar resultados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
          <Link href="/dashboard" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-4 rounded-lg hover:bg-[#fce8df] transition shadow-sm">
            <h3 className="text-lg font-semibold">📊 Visão Geral</h3>
            <p className="text-sm opacity-80">KPIs principais, alertas inteligentes e sugestões automáticas.</p>
          </Link>

          <Link href="/dashboard/performance" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-4 rounded-lg hover:bg-[#fce8df] transition shadow-sm">
            <h3 className="text-lg font-semibold">📈 Performance por Canal</h3>
            <p className="text-sm opacity-80">Compare canais de venda e identifique gargalos operacionais.</p>
          </Link>

          <Link href="/dashboard/clientes" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-4 rounded-lg hover:bg-[#fce8df] transition shadow-sm">
            <h3 className="text-lg font-semibold">👥 Inteligência de Clientes</h3>
            <p className="text-sm opacity-80">Ranking, recorrência, risco de churn e segmentação por comportamento.</p>
          </Link>

          <Link href="/dashboard/campanhas" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-4 rounded-lg hover:bg-[#fce8df] transition shadow-sm">
            <h3 className="text-lg font-semibold">📣 Simulador de Campanhas</h3>
            <p className="text-sm opacity-80">Teste ações promocionais e visualize impactos previstos.</p>
          </Link>

          <Link href="/dashboard/satisfacao" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-4 rounded-lg hover:bg-[#fce8df] transition shadow-sm">
            <h3 className="text-lg font-semibold">⭐ Satisfação & Engajamento</h3>
            <p className="text-sm opacity-80">NPS, sentimento dos clientes e resposta às campanhas.</p>
          </Link>

          <Link href="/dashboard/relatorios" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-4 rounded-lg hover:bg-[#fce8df] transition shadow-sm">
            <h3 className="text-lg font-semibold">📁 Relatórios & Exportações</h3>
            <p className="text-sm opacity-80">Gere relatórios customizados e exporte dados estratégicos.</p>
          </Link>
        </div>
      </div>

    </main>
  );
}