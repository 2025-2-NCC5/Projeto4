"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ sender: "user" | "bot", text: string }[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;

    setMessages(m => [...m, { sender: "user", text: input }]);

    const res = await fetch("/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: input })
    });
    const data = await res.json();

    setMessages(m => [...m, { sender: "bot", text: data.answer }]);
    setInput("");
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">🤖 Chat Inteligente</h1>

      <div className="bg-white border rounded-lg p-4 h-[65vh] overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "user" ? "text-right" : "text-left"}>
            <span className={`inline-block px-3 py-2 rounded-lg ${
              m.sender === "user" ? "bg-[#F26A21] text-white" : "bg-neutral-200"
            }`}>
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Digite sua pergunta..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-[#F26A21] text-white rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
