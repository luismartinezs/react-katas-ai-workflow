import { Spinner } from "@/components/spinner";
import { env } from "@/env";
import { docsOutliner } from "@/lib/agents";
import { kataBrainstormer } from "@/lib/agents/kataBrainstormer";
import { createAI, createStreamableUI, getMutableAIState } from "ai/rsc";

async function submitKataIdea({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  "use server";

  if (!title || !description) {
    console.log("No title or description provided");

    return;
  }

  console.log("submitKataIdea", title, description);

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  uiStream.update(<Spinner />);

  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: `Build a kata for the following idea:\n\n"${title}"\n\n${description}`,
    },
  ]);

  aiState.done([
    ...aiState.get(),
    {
      role: "assistant",
      content: "This is your kata!",
    },
  ])

  uiStream.update(<div>this is your kata, here!</div>)

  uiStream.done();

  return {
    id: Date.now(),
    component: uiStream.value,
  };
}

async function submitCheckedItems({
  item,
  subitem,
}: {
  item: string;
  subitem: string;
}) {
  "use server";

  if (!item || !subitem) {
    console.log("No item or subitem provided");

    return;
  }

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();
  uiStream.update(<Spinner />);

  const topic = `${item}: ${subitem}`;

  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: `Topic selected for the kata: "${topic}"`,
    },
  ]);
  (async () => {
    const kataIdeas = await kataBrainstormer(uiStream, topic, !!env.MOCK);

    if (!kataIdeas) {
      console.error("No kata ideas response");
      return;
    }

    aiState.done([
      ...aiState.get(),
      {
        role: "assistant",
        content: JSON.stringify(kataIdeas),
      },
    ]);
  })();

  return {
    id: Date.now(),
    component: uiStream.value,
  };
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
    submitKataIdea
  },
  initialUIState,
  initialAIState,
});
