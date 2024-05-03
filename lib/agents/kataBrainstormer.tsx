import { createStreamableUI } from "ai/rsc";
import { streamObject } from "ai";
import { Section } from "@/components/Section";
import { DEFAULTS, sectionTitle } from "../constants";
import { Skeleton } from "@/components/ui/skeleton";
import { sleep } from "../utils";
import { KataIdeas } from "@/components/KataIdeas";
import { PartialKataIdeas, kataIdeasSchema } from "../schema/kataIdeas";
import { Config } from "@/app/play/action";

export const mockIdeas: PartialKataIdeas = {
  ideas: [
    {
      title: "Building a Custom useWindowSize Hook",
      description:
        "Create a custom Hook named `useWindowSize` that listens for window resize events and provides the current window dimensions (width and height) to any component that utilizes this Hook. This exercise will help you practice using `useEffect` to handle browser events and clean them up properly. Your Hook should return an object containing the `width` and `height` of the window, and it should ensure that it cleans up the event listener when the component using the Hook unmounts or re-renders.",
    },
    {
      title: "Implementing a useOnlineStatus Hook",
      description:
        "Develop a useOnlineStatus Hook that monitors and returns the browser's online status. This Hook should use useEffect to add and remove event listeners for the online and offline window events. The Hook should provide a single boolean value indicating whether the user is currently online or not. This exercise will challenge you to handle global events and manage state that reflects the current environment outside of the React application.",
    },
    {
      title: "Creating a useInterval Custom Hook",
      description:
        "Construct a useInterval Hook that abstracts setInterval to make it easy for components to run code at specified intervals. The Hook should take a callback function and an interval time in milliseconds as parameters. It should handle setting up the interval when the component mounts, clearing the interval when the component unmounts, and properly handling changes to the interval or the callback function without causing multiple intervals to run simultaneously. This kata will test your ability to combine effects with cleanup logic and dependency management.",
    },
  ],
};

const systemPrompt = `You are an AI specialized in generating exercise ideas based on technical specifications. In the following format:

"{
  "ideas": [{
    "title": "exercise title",
    "description": "exercise description"
  }]
}"

For example:

{
  "ideas":[
    {
      "title":"Building a Custom useWindowSize Hook",
      "description":"Create a custom Hook named \`useWindowSize\` that listens for window resize events and provides the current window dimensions (width and height) to any component that utilizes this Hook. This exercise will help you practice using \`useEffect\` to handle browser events and clean them up properly. Your Hook should return an object containing the \`width\` and \`height\` of the window, and it should ensure that it cleans up the event listener when the component using the Hook unmounts or re-renders."
    },
    ...
  ]
}
`;

const userPrompt = (topic: string) => `I want to create a kata about this:

${topic}

Provide 3 ideas for a kata (a simple exercise to practice). For each idea provide:

- A title
- A brief (one paragraph) description

Your response should be in this format:

"[{
  "title": "exercise title",
  "description": "exercise description"
}]"

Consider only modern React (hooks), so avoid class components, lifecycle methods, propTypes, mixins and higher order components.`;

const KataIdeasSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[250px]" />
  </div>
);

/**
 * Generates exercises from a given React Hook item using an AI model. Supports both mock and live data.
 *
 * @param {ReturnType<typeof createStreamableUI>} uiStream - The UI stream to update with new kata ideas.
 * @param {string} topic - The topic to generate kata ideas for.
 * @param {boolean} [mock=false] - Flag to use mock data instead of streaming from the AI model.
 *
 * @returns {Promise<PartialKataIdeas>} - The exercises generated from the input,
 *                                           either from the AI model or mock data.
 */
export async function kataBrainstormer(
  {
    uiStream,
    topic,
    mock = false,
  }: {
    uiStream: ReturnType<typeof createStreamableUI>;
    topic: string;
    mock: boolean;
  },
  { openaiModel = DEFAULTS.OPENAI_MODEL, openaiProvider }: Config,
) {
  uiStream.update(
    <Section title={sectionTitle.ideas} separator={true}>
      <KataIdeasSkeleton />
    </Section>,
  );

  if (mock) {
    await sleep(300);
    uiStream.update(
      <Section title={sectionTitle.ideas} separator={true}>
        <KataIdeas ideas={mockIdeas} />
      </Section>,
    );
    uiStream.done();
    return mockIdeas;
  }

  let finalExercises: PartialKataIdeas = {};
  try {
    const result = await streamObject({
      model: openaiProvider.chat(openaiModel),
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt(topic),
        },
      ],
      schema: kataIdeasSchema,
    });
    for await (const obj of result.partialObjectStream) {
      if (obj) {
        finalExercises = obj;
        uiStream.update(
          <Section title={sectionTitle.ideas} separator={true}>
            <KataIdeas ideas={obj} />
          </Section>,
        );
      }
    }
  } catch (err) {
    console.error(err);
    uiStream.update(<div>Error occurred while fetching data.</div>);
  } finally {
    uiStream.done();
  }

  return finalExercises;
}
