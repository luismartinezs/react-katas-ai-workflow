import { createAI, getMutableAIState } from "ai/rsc";

async function submitDocs(docsPrompt: string) {
  const aiState = getMutableAIState<typeof AI>()

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
