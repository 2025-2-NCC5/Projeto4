"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  onSelect: (id: string, name: string) => void;
};

export default function CustomerSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (query.length < 2) return;
    const delay = setTimeout(() => {
      axios.get(`/api/customers?name=${query}`).then((res) => {
        setResults(res.data);
      });
    }, 300);
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <label className="block mb-2 font-semibold">Buscar cliente pelo nome</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Digite o nome..."
      />
      <ul className="space-y-2">
        {results.map((c) => (
          <li key={c.id}>
            <button
              onClick={() => onSelect(c.id, c.name)}
              className="text-[#F26A21] hover:underline"
            >
              {c.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
