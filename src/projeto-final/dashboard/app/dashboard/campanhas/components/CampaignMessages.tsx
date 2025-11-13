"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  customerId: string;
  customerName: string;
};

export default function CampaignMessages({ customerId, customerName }: Props) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`/api/campaigns-for?id=${customerId}`).then((res) => {
      setMessages(res.data);
    });
  }, [customerId]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Mensagens recomendadas para {customerName} : </h2>
      <div className="flex flex-col items-start">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-[#DCF8C6] text-sm p-3 rounded-xl max-w-xs shadow mb-2"
          >
            <p>{msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
