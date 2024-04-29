import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { PartialOutline, outlineSchema } from "../schema/outline";
import { experimental_streamObject } from "ai";
import { Section } from "@/components/Section";
import { env } from "@/env";
import { openai } from "../openai";
import Outline from "@/components/Outline";

export async function docsOutliner(
  uiStream: ReturnType<typeof createStreamableUI>,
  docsPrompt: string
): Promise<PartialOutline> {
  const objectStream = createStreamableValue<PartialOutline>();

  uiStream.update(
    <Section title="Outline" separator={true}>
      <Outline outline={objectStream.value} />
    </Section>
  );

  const userPrompt = `I want to create simple exercises that I call "katas" to practice a certain aspect of React.

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

  let finalOutline: PartialOutline = {};
  try {
    const result = await experimental_streamObject({
      model: openai.chat(env.OPENAI_API_MODEL || "gpt-3.5-turbo"),
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
          content: userPrompt,
        },
      ],
      schema: outlineSchema,
    });
    for await (const obj of result.partialObjectStream) {
      if (obj) {
        objectStream.update(obj);
        finalOutline = obj;
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    objectStream.done();
  }

  return finalOutline;
}
