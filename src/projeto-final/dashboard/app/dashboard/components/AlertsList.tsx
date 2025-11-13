"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AlertsList() {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    axios.get("/api/alerts").then((res) => setAlerts(res.data));
  }, []);

  if (!alerts.length) return null;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Alertas Inteligentes</h2>
      <ul className="list-disc pl-5 space-y-1">
        {alerts.map((alert, i) => (
          <li key={i}>{alert}</li>
        ))}
      </ul>
    </div>
  );
}
