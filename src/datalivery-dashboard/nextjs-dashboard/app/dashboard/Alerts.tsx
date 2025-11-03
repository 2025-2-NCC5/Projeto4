"use client";
import { useEffect, useState } from "react";

export default function Alerts() {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/alerts")
      .then(r => r.json())
      .then(setAlerts)
      .catch(() => setAlerts([]));
  }, []);

  if (alerts.length === 0)
    return (
      <div className="p-6 bg-white rounded-lg shadow border">
        <p className="opacity-60">Nenhum alerta no momento 👌</p>
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow border space-y-3">
      <h2 className="text-xl font-semibold mb-2">⚡ Alertas Inteligentes</h2>
      {alerts.map((a, i) => (
        <div key={i} className="p-2 bg-neutral-100 rounded text-sm">
          {a}
        </div>
      ))}
    </div>
  );
}
