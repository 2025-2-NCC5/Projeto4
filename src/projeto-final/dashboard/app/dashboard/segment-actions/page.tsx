"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

type Segment = "VIP" | "Leal" | "Ocasional" | "Raro";

const ACTIONS: Record<Segment, string> = {
  VIP: "Envie um convite exclusivo para um menu degustação.",
  Leal: "Disponibilize cupons de fidelidade para reforçar o vínculo.",
  Ocasional: "Envie ofertas de retorno para reativar interesse.",
  Raro: "Ofereça uma promoção forte de reengajamento (ex: 20% off).",
};

export default function SegmentActionsPage() {
  const { data, isLoading } = useSWR("/api/segments", fetcher);

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">🎯 Ações Recomendadas por Segmento</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((segment: { name: Segment; value: number }, i: number) => (
          <div key={i} className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold">{segment.name}</h2>
            <p className="text-gray-600">Clientes neste grupo: {segment.value}</p>

            <div className="mt-4 p-4 bg-orange-50 border-l-4 border-[#F26A21] text-[#3A2F2A]">
              <p>{ACTIONS[segment.name]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
