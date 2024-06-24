import { BleedSpinner } from "@/components/BleedSpinner";
import DocuForm from "@/components/DocuForm";
import { KataDisplay } from "@/components/KataDisplay";
import { KataIdeas } from "@/components/KataIdeas";
import Outline from "@/components/Outline";
import { Section } from "@/components/Section";
import { env } from "@/env";
import { docsOutliner } from "@/lib/agents";
import { kataBrainstormer } from "@/lib/agents/kataBrainstormer";
import { Kata, genKata } from "@/lib/agents/kataGen";
import { DEFAULTS, OpenaiModel, sectionTitle } from "@/lib/constants";
import { PartialKataIdeas } from "@/lib/schema/kataIdeas";
import { PartialOutline } from "@/lib/schema/outline";
import { createOpenAI } from "@ai-sdk/openai";
import { createAI, createStreamableUI, createStreamableValue, getMutableAIState } from "ai/rsc";

export interface AiState {
  docs?: string;
  outline?: PartialOutline;
  selectedOutlineId?: string;
  ideas?: PartialKataIdeas;
  selectedIdeaId?: string;
  kata?: Kata | undefined;
  openaiKey?: string;
  openaiModel?: OpenaiModel;
}

type UIItem = {
  id: number;
  component: React.ReactNode;
};

export type UIState = UIItem[];

export type Config = {
  openaiProvider: ReturnType<typeof createOpenAI>;
  openaiModel: OpenaiModel;
};

export type AiKey = keyof AiState;

export type Step = "docs" | "outline" | "ideas" | "kata";

// async function softReset() {
//   // resets ai and ui state expect for openai key and model
//   "use server";

//   const aiState = getMutableAIState<typeof AI>();
//   aiState.update({
//     openaiKey: aiState.get().openaiKey,
//     openaiModel: aiState.get().openaiModel,
//   });

//   aiState.done(aiState.get());

//   return {
//     id: Date.now(),
//     component: (
//       <Section title={sectionTitle.docs}>
//         <DocuForm />
//       </Section>
//     ),
//   };
// }

function apiKeyHandler({
  key,
  uiStream,
  showDocuForm = false,
}: {
  uiStream: ReturnType<typeof createStreamableUI>;
  key?: string;
  showDocuForm?: boolean;
}): UIItem | undefined {
  if (!key) {
    console.warn("Without key the AI will not work.");

    uiStream.append(
      <>
        {showDocuForm && (
          <div>
            <Section title={sectionTitle.docs}>
              <DocuForm />
            </Section>
          </div>
        )}
        <div className="my-4 rounded-md border border-red-800 bg-gray-900 p-4 text-red-500">
          <p>Oops... it looks like you didn't enter an OpenAI API key...</p>
        </div>
      </>,
    );

    uiStream.done();

    return {
      id: Date.now(),
      component: uiStream.value,
    };
  }
  return;
}

function getLastStep(aiState: AiState): Step {
  if (aiState.kata) {
    return "kata";
  } else if (aiState.ideas) {
    return "ideas";
  } else if (aiState.outline) {
    return "outline";
  } else if (aiState.docs) {
    return "docs";
  }

  return "docs";
}

function renderUIfromAI(
  aiState: AiState,
  uiStream: ReturnType<typeof createStreamableUI>,
  done = false,
) {
  const step = getLastStep(aiState);

  switch (step) {
    case "docs":
      uiStream.update(
        <Section title={sectionTitle.docs} separator={true}>
          <DocuForm />
        </Section>,
      );
      break;
    case "outline":
      uiStream.update(
        <Section title={sectionTitle.outline} separator={true}>
          <Outline outline={aiState.outline as PartialOutline} />
        </Section>,
      );
      break;

    case "ideas":
      uiStream.update(
        <Section title={sectionTitle.ideas} separator={true}>
          <KataIdeas ideas={aiState.ideas as PartialKataIdeas} />
        </Section>,
      );
      break;

    case "kata":
      const kata = aiState.kata as Kata;
      uiStream.update(
        <Section title={sectionTitle.kata} separator={true}>
          <KataDisplay
            final={kata.final}
            initial={kata.initial}
            readme={kata.readme}
          />
        </Section>,
      );
    default:
      return uiStream.update(<div>Unknown AI state (likely a bug)</div>);
  }
  if (done) {
    uiStream.done();
  }
}

function deleteAiStateKeys(args: AiKey[] | AiKey, done = false) {
  const aiState = getMutableAIState<typeof AI>();
  const temp = { ...aiState.get() };
  const keys = Array.isArray(args) ? args : [args];
  keys.forEach((key) => {
    delete temp[key];
  });
  aiState.update(temp);
  if (done) {
    aiState.done(temp);
  }
}

async function goToStep(step: Step) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();
  const uiStream = createStreamableUI();

  // const aiState = getMutableAIState<typeof AI>();
  switch (step) {
    case "docs":
      deleteAiStateKeys([
        "outline",
        "selectedOutlineId",
        "ideas",
        "selectedIdeaId",
        "kata",
      ]);
      break;
    case "outline":
      deleteAiStateKeys(["ideas", "selectedIdeaId", "kata"]);
      break;
    case "ideas":
      deleteAiStateKeys(["kata"]);
      break;
    case "kata":
      break;
    default:
      break;
  }

  renderUIfromAI(aiState.get(), uiStream);
  uiStream.done();
  aiState.done(aiState.get());

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

  const finished = apiKeyHandler({
    key: aiState.get().openaiKey,
    uiStream,
    showDocuForm: true,
  });

  if (finished) {
    aiState.done({
      ...aiState.get(),
      docs: docsPrompt,
    });
    return finished;
  }

  deleteAiStateKeys([
    "outline",
    "selectedOutlineId",
    "ideas",
    "selectedIdeaId",
    "kata",
  ]);

  uiStream.update(<BleedSpinner />);

  aiState.update({
    ...aiState.get(),
    docs: docsPrompt,
  });

  console.log(aiState.get().openaiKey);


  (async () => {
    const outline = await docsOutliner(
      {
        uiStream,
        docsPrompt,
        mock: !!env.MOCK,
      },
      {
        openaiProvider: createOpenAI({
          apiKey: aiState.get().openaiKey,
        }),
        openaiModel: aiState.get().openaiModel ?? DEFAULTS.OPENAI_MODEL,
      },
    );

    if (!outline) {
      console.error("No outline response");
      return;
    }

    aiState.done({
      ...aiState.get(),
      outline,
    });
  })();

  return {
    id: Date.now(),
    component: uiStream.value,
  };
}

async function submitCheckedItems(
  {
    item,
    subitem,
    description,
  }: {
    item: string;
    subitem: string;
    description: string;
  },
  id: string,
) {
  "use server";

  if (!item || !subitem) {
    console.log("No item or subitem provided");

    return;
  }

  const aiState = getMutableAIState<typeof AI>();

  deleteAiStateKeys(["ideas", "selectedIdeaId", "kata"]);

  aiState.update({
    ...aiState.get(),
    selectedOutlineId: id,
  });
  const uiStream = createStreamableUI();
  uiStream.update(<BleedSpinner />);

  const topic = `${item}: ${subitem}. ${description}`;

  const finished = apiKeyHandler({
    key: aiState.get().openaiKey,
    uiStream,
  });

  if (finished) {
    aiState.done({ ...aiState.get() });
    return finished;
  }

  (async () => {
    const kataIdeas = await kataBrainstormer(
      {
        uiStream,
        topic,
        mock: !!env.MOCK,
      },
      {
        openaiProvider: createOpenAI({
          apiKey: aiState.get().openaiKey,
        }),
        openaiModel: aiState.get().openaiModel ?? DEFAULTS.OPENAI_MODEL,
      },
    );

    if (!kataIdeas) {
      console.error("No kata ideas response");
      return;
    }

    aiState.done({
      ...aiState.get(),
      ideas: kataIdeas,
    });
  })();

  return {
    id: Date.now(),
    component: uiStream.value,
  };
}

async function submitKataIdea(
  {
    title,
    description,
  }: {
    title: string;
    description: string;
  },
  id: string,
) {
  "use server";

  if (!title || !description) {
    console.log("No title or description provided");

    return;
  }

  const aiState = getMutableAIState<typeof AI>();

  deleteAiStateKeys("kata");

  aiState.update({
    ...aiState.get(),
    selectedIdeaId: id,
  });
  const uiStream = createStreamableUI();
  uiStream.update(<BleedSpinner />);

  const finished = apiKeyHandler({
    key: aiState.get().openaiKey,
    uiStream,
  });

  if (finished) {
    aiState.done({ ...aiState.get() });
    return finished;
  }

  (async () => {
    const kata = await genKata(
      {
        uiStream,
        title,
        description,
        mock: !!env.MOCK,
      },
      {
        openaiProvider: createOpenAI({
          apiKey: aiState.get().openaiKey,
        }),
        openaiModel: aiState.get().openaiModel ?? DEFAULTS.OPENAI_MODEL,
      },
    );

    if (!kata) {
      console.error("No kata response");
      return;
    }

    aiState.done({
      ...aiState.get(),
      kata,
    });

  })();

  return {
    id: Date.now(),
    component: uiStream.value,
  };
}

async function submitOpenaiKey(secret: string) {
  "use server";

  if (!secret) {
    console.warn("Without key the AI will not work.");
  }

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    openaiKey: secret,
  });

  aiState.done(aiState.get());
}

const initialAIState: AiState = {};
const initialUIState: UIState = [];

export const AI = createAI({
  actions: {
    // softReset,
    submitDocs,
    submitCheckedItems,
    submitKataIdea,
    goToStep,
    submitOpenaiKey,
  },
  initialUIState,
  initialAIState,
});
