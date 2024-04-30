import { createStreamableUI } from "ai/rsc";
import { PartialOutline, outlineSchema } from "../schema/outline";
import { experimental_streamObject } from "ai";
import { Section } from "@/components/Section";
import { env } from "@/env";
import { createOpenAI } from "@ai-sdk/openai";
import { DEFAULTS } from "../constants";
import { Skeleton } from "@/components/ui/skeleton";
import Outline from "@/components/Outline";
import { sleep } from "../utils";

export const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const mockOutline = {
  outlineTitle: "Mock useEffect outline",
  items: [
    {
      title: "When to use",
      subitems: [
        "When you want to perform side effects in function components",
        "When you want to manage side effects in a declarative way",
      ],
    },
    {
      title: "When not to use",
      subitems: [
        "When you want to perform side effects in class components",
        "When you want to manage side effects in an imperative way",
      ],
    },
  ],
};

const userPrompt = (
  docsPrompt: string
) => `I want to create simple exercises that I call "katas" to practice a certain aspect of React.

I will first provide you with the documentation of the relevant documentation on the topic. Here they are:

${docsPrompt}

This is the end of the documentation.

You next task is to provide an outline of these docs, as a bulletpoint list.  Each item is a specfic aspect, feature, use case or gotcha (i.e. when not to use it) of useEffect

Provide:

- outline title
- outline items as a list of bullet points
- each item of the outline can have up to 3 nested bullet points

Your response should be in this format:

"{
  "outlineTitle": "outline title",
  "items": [
    {
      "title": "outline item 1",
      "subitems": [
        "subitem 1", "subitem 2", "subitem 3"
      ]
    }
  ]
}"
`;

const OutlineSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <div className="space-y-2 ml-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  </div>
);

/**
 * Generates an outline from technical documentation using an AI model. This function
 * supports both live and mock data modes.
 *
 * @param {ReturnType<typeof createStreamableUI>} uiStream - The UI stream to update with new outlines.
 * @param {string} docsPrompt - The technical documentation provided as input to the AI model.
 * @param {boolean} [mock=false] - Flag to use mock data instead of streaming from the AI model.
 *
 * @returns {Promise<PartialOutline>} - The final outline generated from the documentation,
 *                                      either from the AI model or mock data.
 *
 * The function initiates by displaying a skeleton loader. If in mock mode, it waits briefly
 * before displaying a predefined mock outline and then completes. If not in mock mode,
 * it streams data from the AI model, updating the UI with new content as it is received,
 * and handles any errors during the process.
 */
export async function docsOutliner(
  uiStream: ReturnType<typeof createStreamableUI>,
  docsPrompt: string,
  mock: boolean = false
): Promise<PartialOutline> {
  uiStream.update(
    <Section title="Outline" separator={true}>
      <OutlineSkeleton />
    </Section>
  );

  if (mock) {
    await sleep(700);
    uiStream.update(
      <Section title="Outline" separator={true}>
        <Outline outline={mockOutline} />
      </Section>
    );
    uiStream.done();
    return mockOutline;
  }

  let finalOutline: PartialOutline = {};
  try {
    const result = await experimental_streamObject({
      model: openai.chat(env.OPENAI_API_MODEL || DEFAULTS.OPENAI_MODEL),
      system: `You are specialized in turning technical documentation into exhaustive outlines. In the following format:

      "{
        "outlineTitle": "outline title",
        "items": [
          {
            "title": "outline item 1",
            "subitems": [
              "subitem 1", "subitem 2", "subitem 3"
            ]
          }
        ]
      }"`,
      messages: [
        {
          role: "user",
          content: userPrompt(docsPrompt),
        },
      ],
      schema: outlineSchema,
    });
    for await (const obj of result.partialObjectStream) {
      if (obj) {
        finalOutline = obj;
        uiStream.update(
          <Section title="Outline" separator={true}>
            <Outline outline={obj} />
          </Section>
        );
      }
    }
  } catch (err) {
    console.error(err);
    uiStream.update(<div>Error occurred while fetching data.</div>);
  } finally {
    uiStream.done();
  }

  return finalOutline;
}
