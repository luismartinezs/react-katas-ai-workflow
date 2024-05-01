import AiState from "@/components/AiState";
import { ChatMessages } from "@/components/ChatMessages";
import ChatPanel from "@/components/ChatPanel";
import { KataDisplay } from "@/components/KataDisplay";
import UiState from "@/components/UiState";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:p-24 px-4 py-16 max-w-5xl mx-auto">
      <KataDisplay />
      <ChatPanel />
      <ChatMessages />
      <Separator orientation="horizontal" className="mt-8 mb-1" />
      <Separator orientation="horizontal" className="mb-8" />
      <AiState />
      <UiState />
    </main>
  );
}
