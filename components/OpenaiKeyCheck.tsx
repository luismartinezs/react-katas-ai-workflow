"use client";

import { AI } from "@/app/play/action";
import { useAIState } from "ai/rsc";
import { Check, X } from "lucide-react";

type OpenaiKeyCheckProps = {};

const OpenaiKeyCheck = ({}: OpenaiKeyCheckProps): React.JSX.Element => {
  const [ai] = useAIState<typeof AI>();

  if (ai.openaiKey) {
    // return green checkmark
    return (
      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-700">
        <Check size={10} className="text-white" />
      </div>
    );
  }

  return (
    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-red-900">
      <X size={10} className="text-white" />
    </div>
  );
};

export { OpenaiKeyCheck };
