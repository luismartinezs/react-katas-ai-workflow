"use client";

import { AI } from "@/app/action";
import { useUIState } from "ai/rsc";

export function ChatMessages() {
  const [messages, setMessages] = useUIState<typeof AI>();

  return (
    <div>
      <h2 className="text-xl font-bold">Messages:</h2>
      {messages.map((message: { id: number; component: React.ReactNode }) => (
        <div key={message.id}>{message.component}</div>
      ))}
    </div>
  );
}
