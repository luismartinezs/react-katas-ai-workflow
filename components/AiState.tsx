"use client";

import { AI } from "@/app/play/action";
import { useAIState } from "ai/rsc";
import { Separator } from "./ui/separator";

const AiState = (): React.JSX.Element => {
  const [ai] = useAIState<typeof AI>();

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">AI state</h2>
      <Separator />
      {ai.length > 0 ? (
        ai.map((msg, idx) => (
          <p key={idx} className="mt-4">
            <span className="text-gray-400">{msg.role}: </span>
            <span>{msg.content}</span>
          </p>
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </div>
  );
};

export default AiState;
