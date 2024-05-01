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

const KataCodeDisplay = ({
  pending,
  content,
}: {
  pending?: boolean;
  content?: string;
}): React.JSX.Element => {
  return (
    <Card className="relative w-full p-4">
      {content && (
        <CopyToClipboardButton
          textToCopy={content}
          className="absolute top-4 right-4 z-10"
        />
      )}

      <MemoizedReactMarkdown className="prose-sm prose-neutral prose-a:text-accent-100/50 overflow-auto">
        {pending ? "Waiting for data..." : content || "No data"}
      </MemoizedReactMarkdown>
    </Card>
  );
};

const KataCodeStreamable = ({
  content,
}: {
  content: string | StreamableValue<string>;
}): React.JSX.Element => {
  const [data, error, pending] = useStreamableValue(content);

  if (error) {
    return <div className="text-red-500">Error</div>;
  }

  return <KataCodeDisplay pending={pending} content={data} />;
};

const KataDisplayParser = ({
  data,
}: {
  data?: string | StreamableValue<string>;
}) =>
  data &&
  (typeof data === "string" ? (
    <KataCodeDisplay content={data} />
  ) : (
    <KataCodeStreamable content={data} />
  ));

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
          <KataDisplayParser data={final} />
        </TabsContent>
        <TabsContent value="initial">
          <KataDisplayParser data={initial} />
        </TabsContent>
        <TabsContent value="readme">
          <KataDisplayParser data={readme} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { KataDisplay };
