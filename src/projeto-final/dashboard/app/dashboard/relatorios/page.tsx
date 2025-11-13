import RelatorioTable from "./components/RelatorioTable";

export default function RelatoriosPage() {
  return (
    <main className="min-h-screen bg-[#EFE9DD] text-[#3A2F2A] p-8 space-y-8">
      <h1 className="text-3xl font-bold">📄 Relatórios & Exportações</h1>
      <RelatorioTable />
    </main>
  );
}
