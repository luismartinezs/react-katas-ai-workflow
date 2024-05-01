import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type KataDisplayProps = {};

const KataCode = ({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element => {
  return (
    <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto">
      {children}
    </pre>
  );
};

const KataDisplay = ({}: KataDisplayProps): React.JSX.Element => {
  return (
    <div className="w-full my-4">
      <h2 className="text-xl font-bold mb-2">KataDisplay</h2>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="final">Final</TabsTrigger>
          <TabsTrigger value="initial">Initial</TabsTrigger>
          <TabsTrigger value="readme">README.md</TabsTrigger>
        </TabsList>
        <TabsContent value="final">
          <KataCode>FINAL</KataCode>
        </TabsContent>
        <TabsContent value="initial">
          <KataCode>INITIAL</KataCode>
        </TabsContent>
        <TabsContent value="readme">
          <KataCode>README</KataCode>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { KataDisplay };
