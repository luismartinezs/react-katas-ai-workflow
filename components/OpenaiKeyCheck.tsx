"use client";

import { Check, X } from "lucide-react";
import { useStoreKey } from "./useStoreKey";
import { useAIState } from "ai/rsc";
import { AI } from "@/app/play/action";
import { useEffect } from "react";
import { useStoreModel } from "./useStoreModel";

type OpenaiKeyCheckProps = {};

const OpenaiKeyCheck = ({}: OpenaiKeyCheckProps): React.JSX.Element => {
  const [storedKey] = useStoreKey()
  const [storedModel] = useStoreModel()
  const [ai, setAi] = useAIState<typeof AI>();

  useEffect(() => {
    setAi({
      openaiKey: storedKey,
      openaiModel: storedModel,
    });
  }, [storedKey, storedModel])

  if (storedKey) {
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
