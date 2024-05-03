"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
            We do not store this key, only send it to the OpenAI API. You can
            get one from the{" "}
            <a target="_blank" href="https://platform.openai.com/api-keys">openai site</a>.
          </DialogDescription>
        </DialogHeader>
        <ApiKeyForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export { OpenaiKeyDialog };
