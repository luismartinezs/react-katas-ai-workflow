"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useAIState, useActions } from "ai/rsc";
import { AI } from "@/app/play/action";
import { OpenaiModel, openaiModels } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ApiKeyFormProps = {
  onSuccess: () => void;
};

const ApiKeyForm = ({ onSuccess }: ApiKeyFormProps): React.JSX.Element => {
  const [ai, setAi] = useAIState<typeof AI>();
  const [key, setKey] = useState<string>(ai?.openaiKey ?? "");
  const [model, setModel] = useState<OpenaiModel | "">(ai?.openaiModel ?? "");
  const { submitOpenaiKey } = useActions();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await submitOpenaiKey(key);

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="key">Your secret key:</Label>
        <Input
          id="key"
          placeholder="sk-proj-XH7cssC8lgZCDaUzTYNjT3BlbkFJmVLOgA9kQDxoYHG2XB30"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="model">Openai Model:</Label>
        <Select value={model} onValueChange={(v: OpenaiModel) => setModel(v)}>
          <SelectTrigger>
            <SelectValue
              placeholder="Choose an openai model"
              className="text-gray-500"
            />
          </SelectTrigger>
          <SelectContent>
            {openaiModels.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 flex w-full justify-end">
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
};

export { ApiKeyForm };
