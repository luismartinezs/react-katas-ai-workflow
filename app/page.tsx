import AiState from "@/components/AiState";
import { ChatMessages } from "@/components/ChatMessages";
import ChatPanel from "@/components/ChatPanel";
import UiState from "@/components/UiState";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1>AI React Katas Builder</h1>
      <Separator orientation="horizontal" className="my-8" />
      <ChatPanel />
      <ChatMessages />
      <Separator orientation="horizontal" className="mt-8 mb-1" />
      <Separator orientation="horizontal" className="mb-8" />
      <AiState />
      <UiState />
    </main>
  );
}
