import AiState from "@/components/AiState";
import { ChatMessages } from "@/components/ChatMessages";
import ChatPanel from "@/components/ChatPanel";
import { KataDisplay } from "@/components/KataDisplay";
import UiState from "@/components/UiState";
import { Separator } from "@/components/ui/separator";
import { mockFinal, mockInitial, mockReadme } from "@/lib/agents/kataGen";

export default function Play() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto px-4 py-16 md:p-24">
      {/* <KataDisplay
        final={mockFinal}
        initial={mockInitial}
        readme={mockReadme}
      /> */}
      <ChatPanel />
      <ChatMessages />
      {/* <Separator orientation="horizontal" className="mt-8 mb-1" />
      <Separator orientation="horizontal" className="mb-8" />
      <AiState />
      <UiState /> */}
    </div>
  );
}
