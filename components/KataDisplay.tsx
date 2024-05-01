"use client";

import { StreamableValue, useStreamableValue } from "ai/rsc";
import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MemoizedReactMarkdown } from "./markdown";
import { Card } from "./ui/card";

type KataDisplayProps = {
  final?: string | StreamableValue<string>;
  initial?: string | StreamableValue<string>;
  readme?: string | StreamableValue<string>;
};

const KataCode = ({
  content,
}: {
  content: string | StreamableValue<string>;
}): React.JSX.Element => {
  const [data, error, pending] = useStreamableValue(content);

  if (error) {
    return <div className="text-red-500">Error</div>;
  }

  return (
    <Card className="relative w-full p-4">
      {data && (
        <CopyToClipboardButton
          textToCopy={data}
          className="absolute top-4 right-4 z-10"
        />
      )}

      <MemoizedReactMarkdown className="prose-sm prose-neutral prose-a:text-accent-100/50">
        {pending ? "Waiting for data..." : data || "No data"}
      </MemoizedReactMarkdown>
    </Card>
  );
};

const KataDisplay = ({
  final,
  initial,
  readme,
}: KataDisplayProps): React.JSX.Element => {
  return (
    <div className="w-full my-4">
      <h2 className="text-xl font-bold mb-2">KataDisplay</h2>
      <Tabs defaultValue="final" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="final">Final</TabsTrigger>
          <TabsTrigger value="initial">Initial</TabsTrigger>
          <TabsTrigger value="readme">README.md</TabsTrigger>
        </TabsList>
        <TabsContent value="final">
          {final && <KataCode content={final} />}
        </TabsContent>
        <TabsContent value="initial">
          {initial && <KataCode content={initial} />}
        </TabsContent>
        <TabsContent value="readme">
          {readme && <KataCode content={readme} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { KataDisplay };
