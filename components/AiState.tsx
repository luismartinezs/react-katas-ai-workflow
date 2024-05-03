"use client";

import { AI } from "@/app/play/action";
import { useAIState } from "ai/rsc";
import { Separator } from "./ui/separator";

function ValueDisplay ({value}:{
  value: string | { [key: string]: any }
}):React.JSX.Element {
  const isJson = typeof value !== "string";
  if (isJson) {
    return (
      <pre>{JSON.stringify(value, null, 2)}</pre>
    );
  }
  return (
    <span>{value}</span>
  );
}

const AiState = (): React.JSX.Element => {
  const [ai] = useAIState<typeof AI>();

  const entries = Object.entries(ai);

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">AI state</h2>
      <Separator />
      {entries.length > 0 ? (
        entries.map(([key, val], idx) => (
          <p key={idx} className="mt-4">
            <span className="text-gray-400">{key}: </span>
            <ValueDisplay value={val} />
          </p>
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </div>
  );
};

export default AiState;
