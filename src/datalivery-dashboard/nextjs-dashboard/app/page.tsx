import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#EFE9DD] text-[#3A2F2A] p-8">

      <div className="text-center max-w-2xl">
        <Image
          src="/datalivery-logo.svg" // coloque seu logo em /public
          alt="Datalivery Logo"
          width={240}
          height={200}
          className="mx-auto mb-6"
        />

        <h1 className="text-4xl font-semibold mb-4">
          Bem-vindo à Datalivery
        </h1>

        <p className="text-lg mb-8 opacity-90">
          Inteligência de dados para restaurantes que utilizam serviços de delivery. 
          Acompanhe métricas, compare desempenho e identifique oportunidades de crescimento.
        </p>

        {/* Botões */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

          <Link href="/dashboard" className="bg-[#F26A21] text-white px-6 py-3 rounded-lg hover:bg-[#d4591d] text-center transition">
            📊 Painel Principal
          </Link>

          <Link href="/dashboard/ranking" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-3 rounded-lg hover:bg-[#fce8df] text-center transition">
            🥇 Ranking de Clientes
          </Link>

          <Link href="/dashboard/nps" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-3 rounded-lg hover:bg-[#fce8df] text-center transition">
            ⭐ NPS & Satisfação
          </Link>

          <Link href="/dashboard/clusters" className="bg-white border border-[#F26A21] text-[#F26A21] px-6 py-3 rounded-lg hover:bg-[#fce8df] text-center transition">
            🎯 Segmentação e Clusters
          </Link>

        </div>
      </div>

    </main>
  );
}