import { Spinner } from "@/components/spinner";
import { env } from "@/env";
import { docsOutliner } from "@/lib/agents";
import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";

async function submitCheckedItems(formData: FormData) {
  "use server";


}

async function submitDocs(docsPrompt: string) {
  "use server";
  /*
  - Usage
  async submit (prompt) {
    init ui stream

    this IIFE is needed to that return value is not blocked by awaited promise
    ;(async => {
      await promise
      update ui stream
      close ui stream
    })()

    return ui stream
  }
  */
  if (!docsPrompt) {
    console.log("No docs prompt provided");

    return;
  }

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();

  uiStream.update(<Spinner />);

  (async () => {
    const outline = await docsOutliner(uiStream, docsPrompt, !!env.MOCK);

    if (!outline) {
      console.error("No outline response");
      return;
    }

    aiState.done([
      ...aiState.get(),
      {
        role: "assistant",
        content: JSON.stringify(outline),
      },
    ]);
  })();

  return {
    id: Date.now(),
    component: uiStream.value,
  };
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
    submitCheckedItems,
  },
  initialUIState,
  initialAIState,
});
