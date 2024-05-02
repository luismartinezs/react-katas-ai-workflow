"use client";

import { useCopyToClipboard } from "usehooks-ts";
import { Button } from "./ui/button";
import { Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

type CopyToClipboardButtonProps = {
  textToCopy: string;
  className?: string;
};

const CopyToClipboardButton = ({
  textToCopy,
  className
}: CopyToClipboardButtonProps): React.JSX.Element => {
  const [copiedText, copy] = useCopyToClipboard();
  const { toast } = useToast()

  const isCodeBlock = textToCopy.startsWith("```");

  async function handleClick() {
    try {
      await copy(isCodeBlock ? textToCopy.replace(/^```tsx\n/, '').replace(/\n```$/, '') : textToCopy);
      toast({
        title: "Copied text to clipboard",
        dismissTime: 1000
      })
    } catch (err) {
      toast({
        title: "Failed to copy to clipboard",
        dismissTime: 1000
      })
    }
  }

  return (
    <Button variant="outline" size="icon" onClick={handleClick} className={cn(className)}>
      <Clipboard />
    </Button>
  );
};

export { CopyToClipboardButton };
