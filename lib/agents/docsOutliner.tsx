import { createStreamableUI } from "ai/rsc";
import { PartialOutline, outlineSchema } from "../schema/outline";
import { streamObject } from "ai";
import { Section } from "@/components/Section";
import { DEFAULTS, sectionTitle } from "../constants";
import { Skeleton } from "@/components/ui/skeleton";
import Outline from "@/components/Outline";
import { sleep } from "../utils";
import { Config } from "@/app/play/action";
import { Error } from "@/components/Error";

const mockOutline = {
  outlineTitle: "Detailed Outline of the `useEffect` Hook Documentation",
  items: [
    {
      title: "Introduction to `useEffect`",
      subitems: [
        {
          title: "React Hook",
          description:
            "`useEffect` is a React Hook used to synchronize a component with an external system.",
        },
        {
          title: "Function Signature",
          description:
            "`useEffect(setup, dependencies?)` where setup is a function and dependencies is an optional array.",
        },
        {
          title: "Basic Example",
          description:
            "Demonstrates how to use `useEffect` to handle side effects such as connecting to a network.",
        },
      ],
    },
    {
      title: "Usage Patterns",
      subitems: [
        {
          title: "Connecting to External Systems",
          description:
            "Guidelines and examples on using `useEffect` to maintain connections to external systems.",
        },
        {
          title: "Controlling Non-React Widgets",
          description:
            "How to use `useEffect` to manipulate widgets that are not built with React.",
        },
        {
          title: "Fetching Data",
          description:
            "Describes how to fetch data in a React component using `useEffect`.",
        },
      ],
    },
    {
      title: "Advanced Usage",
      subitems: [
        {
          title: "Custom Hooks",
          description:
            "Wrapping effects in custom hooks for reusability and abstraction.",
        },
        {
          title: "Handling Updates with Dependencies",
          description:
            "Demonstration on specifying dependencies for `useEffect` to manage updates correctly.",
        },
        {
          title: "Cleanup Function",
          description:
            "How to write a cleanup function within `useEffect` for clearing or resetting effects.",
        },
      ],
    },
    {
      title: "Common Issues and Solutions",
      subitems: [
        {
          title: "Effect Running Twice",
          description:
            "Handling scenarios where the `useEffect` runs twice due to React's Strict Mode.",
        },
        {
          title: "Infinite Re-render Loops",
          description:
            "Identification and resolution of infinite loops caused by dependency changes.",
        },
        {
          title: "Unnecessary Renders",
          description:
            "Optimizing by removing unnecessary dependencies to prevent excessive re-renders.",
        },
      ],
    },
    {
      title: "Special Considerations",
      subitems: [
        {
          title: "Strict Mode Extra Cycle",
          description:
            "Explanation on why Strict Mode in React triggers an extra setup and cleanup cycle during development.",
        },
        {
          title: "Server vs. Client Rendering",
          description:
            "Handling differences in `useEffect` execution between server-side and client-side rendering.",
        },
        {
          title: "Misuse of `useEffect`",
          description:
            "Advises on situations where `useEffect` might be overused or incorrectly applied.",
        },
      ],
    },
  ],
};

const userPrompt = (
  docsPrompt: string,
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
        {
          "title": "subitem 1",
          "description": "subitem 1 description"
        },
        ...
      ]
    }
  ]
}"
`;

const systemPrompt = `You are specialized in turning technical documentation into exhaustive outlines. In the following format:

"{
  "outlineTitle": "outline title",
  "items": [
    {
      "title": "outline item 1",
      "subitems": [
        {
          "title": "subitem 1",
          "description": "subitem description"
        },
        ...
      ]
    },
    ...
  ]
}"

For example:

{
  "outlineTitle": "Detailed Outline of the \`useEffect\` Hook Documentation",
  "items": [
    {
      "title": "Introduction to \`useEffect\`",
      "subitems": [
        {
          "title": "React Hook",
          "description": "\`useEffect\` is a React Hook used to synchronize a component with an external system."
        },
        {
          "title": "Function Signature",
          "description": "\`useEffect(setup, dependencies?)\` where setup is a function and dependencies is an optional array."
        },
        {
          "title": "Basic Example",
          "description": "Demonstrates how to use \`useEffect\` to handle side effects such as connecting to a network."
        }
      ]
    },
    {
      "title": "Usage Patterns",
      "subitems": [
        {
          "title": "Connecting to External Systems",
          "description": "Guidelines and examples on using \`useEffect\` to maintain connections to external systems."
        },
        {
          "title": "Controlling Non-React Widgets",
          "description": "How to use \`useEffect\` to manipulate widgets that are not built with React."
        },
        {
          "title": "Fetching Data",
          "description": "Describes how to fetch data in a React component using \`useEffect\`."
        }
      ]
    },
    {
      "title": "Advanced Usage",
      "subitems": [
        {
          "title": "Custom Hooks",
          "description": "Wrapping effects in custom hooks for reusability and abstraction."
        },
        {
          "title": "Handling Updates with Dependencies",
          "description": "Demonstration on specifying dependencies for \`useEffect\` to manage updates correctly."
        },
        {
          "title": "Cleanup Function",
          "description": "How to write a cleanup function within \`useEffect\` for clearing or resetting effects."
        }
      ]
    },
    ...
  ]
}`;

const OutlineSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <div className="ml-2 space-y-2">
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
  {
    uiStream,
    docsPrompt,
    mock = false,
  }: {
    uiStream: ReturnType<typeof createStreamableUI>;
    docsPrompt: string;
    mock: boolean;
  },
  { openaiModel = DEFAULTS.OPENAI_MODEL, openaiProvider }: Config,
): Promise<PartialOutline> {
  uiStream.update(
    <Section title={sectionTitle.outline} separator={true}>
      <OutlineSkeleton />
    </Section>,
  );

  if (mock) {
    await sleep(300);
    uiStream.update(
      <Section title={sectionTitle.outline} separator={true}>
        <Outline outline={mockOutline} />
      </Section>,
    );
    uiStream.done();
    return mockOutline;
  }

  let finalOutline: PartialOutline = {};
  console.log(openaiModel);

  try {
    const result = await streamObject({
      model: openaiProvider.chat(openaiModel),
      system: systemPrompt,
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
          <Section title={sectionTitle.outline} separator={true}>
            <Outline outline={obj} />
          </Section>,
        );
      }
    }
  } catch (err) {
    console.error(err);
    uiStream.update(<Error message="Error occurred while fetching data" />);
  } finally {
    uiStream.done();
  }

  return finalOutline;
}
