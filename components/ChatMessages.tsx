"use client";

import { AI } from "@/app/play/action";
import { useUIState } from "ai/rsc";

export function ChatMessages() {
  const [messages] = useUIState<typeof AI>();

  return (
    <div>
      {messages.map((message: { id: number; component: React.ReactNode }) => (
        <div key={message.id}>{message.component}</div>
      ))}
    </div>
  );
}
