"use client";

import { StreamableValue, useStreamableValue } from "ai/rsc";
import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { MemoizedReactMarkdown } from "./markdown";
import { Card } from "./ui/card";
import { Sparkles } from "lucide-react";

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
          className="absolute right-4 top-4 z-10"
        />
      )}

      <MemoizedReactMarkdown className="prose-sm prose-neutral prose-a:text-accent-100/50 markdown-display overflow-auto">
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
    <div className="my-4 w-full">
      <div className="flex gap-1">
        <h2 className="mb-2 whitespace-nowrap text-xl font-bold">
          New React Kata
        </h2>
        <Sparkles />
      </div>
      <p className="mt-1">Your new kata has been created!</p>
      <ol className="my-2 ml-4 list-decimal space-y-2">
        <li>Copy the initial version of the kata into a React project</li>
        <li>Read the README file to understand the assignment</li>
        <li>Peek at the final version for the solution</li>
      </ol>
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
