import { createAI } from "ai/rsc";

async function submit() {
  // todo
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
    submit,
  },
  initialUIState,
  initialAIState,
});
