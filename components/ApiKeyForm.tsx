"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useActions } from "ai/rsc";
import { OpenaiModel, openaiModels } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStoreKey } from "./useStoreKey";
import { useStoreModel } from "./useStoreModel";

type ApiKeyFormProps = {
  onSuccess: () => void;
};

const ApiKeyForm = ({ onSuccess }: ApiKeyFormProps): React.JSX.Element => {
  const [storedKey, storeKey] = useStoreKey();
  const [storedModel, storeModel] = useStoreModel();
  const [key, setKey] = useState<string>(storedKey ?? "");
  const [model, setModel] = useState<OpenaiModel>(storedModel);
  const { submitOpenaiKey } = useActions();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await submitOpenaiKey(key);
    storeKey(key);
    storeModel(model);

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="key">Your secret key:</Label>
        <Input
          id="key"
          placeholder="your-openai-api-key"
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

      <div className="mt-2 flex w-full gap-3 justify-end">
        {storedKey && <Button size="sm">Clear key</Button>}
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
};

export { ApiKeyForm };
