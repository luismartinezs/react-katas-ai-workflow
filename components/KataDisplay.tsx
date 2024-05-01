import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type KataDisplayProps = {
  final: string;
  initial: string;
  readme: string;
};

const KataCode = ({ content }: { content: string }): React.JSX.Element => {
  return (
    <div className="relative w-full">
      <CopyToClipboardButton
        textToCopy={content}
        className="absolute top-4 right-4 z-10"
      />

      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto relative">
        {content}
      </pre>
    </div>
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
      <Tabs defaultValue="readme" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="readme">README.md</TabsTrigger>
          <TabsTrigger value="initial">Initial</TabsTrigger>
          <TabsTrigger value="final">Final</TabsTrigger>
        </TabsList>
        <TabsContent value="final">
          <KataCode content={final} />
        </TabsContent>
        <TabsContent value="initial">
          <KataCode content={initial} />
        </TabsContent>
        <TabsContent value="readme">
          <KataCode content={readme} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { KataDisplay };
