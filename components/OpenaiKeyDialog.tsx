"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { KeyRound } from "lucide-react";
import { ApiKeyForm } from "./ApiKeyForm";
import { useState } from "react";
import { OpenaiKeyCheck } from "./OpenaiKeyCheck";

type OpenaiKeyDialogProps = {};

const OpenaiKeyDialog = ({}: OpenaiKeyDialogProps): React.JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="absolute right-0 top-0" asChild>
        <Button size="xs" variant="outline" className="text-gray-400">
          <KeyRound size={16} />
          &nbsp; OpenAI Key&nbsp;
          <OpenaiKeyCheck />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your OpenAI key</DialogTitle>
          <DialogDescription>
            We do not share this key with anyone, we only send it to the OpenAI
            API. You can get one from the{" "}
            <a target="_blank" href="https://platform.openai.com/api-keys">
              openai site
            </a>
            . The key will be stored in your browser&apos;s local storage. To
            minimize risk, create a new key and set your{" "}
            <a
              target="_blank"
              href="https://platform.openai.com/settings/organization/limits"
            >
              openai spend limit
            </a>{" "}
            to a small number, and <u>clear key after use</u>.
          </DialogDescription>
        </DialogHeader>
        <ApiKeyForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export { OpenaiKeyDialog };
