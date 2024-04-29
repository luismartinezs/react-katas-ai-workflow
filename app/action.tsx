import { Spinner } from "@/components/spinner";
import { docsOutliner } from "@/lib/agents";
import { ExperimentalMessage } from "ai";
import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";

async function submitDocs(docsPrompt: string) {
  "use server"
  if (!docsPrompt) {
    console.log("No docs prompt provided");

    return;
  }

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();

  uiStream.update(<Spinner />)

  const messages: ExperimentalMessage[] = aiState.get() as any;

  messages.push({
    role: "user",
    content: docsPrompt,
  })

  const outline = await docsOutliner(uiStream, docsPrompt);

  console.log(JSON.stringify(outline, null, 2));

  uiStream.done()
  aiState.done([
    ...aiState.get(),
    {
      role: "assistant",
      content: JSON.stringify(outline),
    },
  ])


  return {
    id: Date.now(),
    component: uiStream.value,
  }
}

const initialAIState: {
  role: "user" | "assistant" | "system" | "function" | "tool";
  content: string;
  id?: number;
  name?: string;
}[] = [];
const initialUIState: {
  id: number;
  component: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitDocs,
  },
  initialUIState,
  initialAIState,
});
