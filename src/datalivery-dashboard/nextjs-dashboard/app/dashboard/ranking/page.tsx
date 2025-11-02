import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function RankingPage() {
  const ranking = await prisma.$queryRaw<
    { name: string; total: number }[]
  >`
    SELECT c.name, 
        SUM(o.order_value)::float AS total
    FROM customers c
    JOIN orders o ON o.customer_id = c.id
    GROUP BY c.name
    ORDER BY total DESC
    LIMIT 20;
  `;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">🏆 Ranking de Clientes</h1>

      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-[#F26A21] text-white">
          <tr>
            <th className="p-3">Cliente</th>
            <th className="p-3 text-right">Total gasto</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((item, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.name}</td>
              <td className="p-3 text-right">R$ {item.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}