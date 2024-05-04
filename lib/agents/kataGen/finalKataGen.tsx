import { AiState, Config } from "@/app/play/action";
import { env } from "@/env";
import { DEFAULTS, OpenaiModel } from "@/lib/constants";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const mockFinal = `\`\`\`tsx
import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: window.innerWidth, height: window.innerHeight })

  // Function to update state with the current window size
  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  }

  useEffect(() => {
    // Set up the event listener for window resize
    window.addEventListener('resize', handleResize)

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array ensures this effect runs only once on mount and cleanup on unmount

  return windowSize
}

export default (): React.JSX.Element => {
  const { width, height } = useWindowSize()

  return (
    <div className="text-center p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Current Window Size</h1>
      <p className="text-lg text-gray-600">
        Width: <span className="text-gray-800 font-medium">{width} px</span>
      </p>
      <p className="text-lg text-gray-600">
        Height: <span className="text-gray-800 font-medium">{height} px</span>
      </p>
    </div>
  )
}
\`\`\``;

const getUserPrompt = (
  title: string,
  description: string,
) => `I'm gonna implement this kata:

Title: ${title}

Description: ${description}

First, I'm going to provide a coding style that I want you to use:

interface Props {
  // Component props
}

// other code (child components, hooks, etc)

export default (props: Props): React.JSX.Element => {
  return (
    <div>
      {/* code */}
    </div>
  );
};

Only add props if needed.

The tech stack is: React 18, tailwind, typescript.

Your task is to create the final, completed and solved version of the code for a "kata" that  serves to practice the above topic.

Keep the code self contained. The code must render some kind of UI that allows to visualize the result of the code execution in the browser. Provide only the code, written within a code block. The root or top level component should be a default export. Avoid third party API calls at all costs. If an API call is a must, always mock it, never do an API call to a real third party service.

Make sure your response contains only code within a code block wrapped in \`\`\`tsx and \`\`\` tags. The component name must be two words and must avoid the word "component".`;

const systemPrompt = `You are a extremely skillful senior React developer, specialized in crafting optimal functional components using modern state-of-the-art React. Your code always follows best coding practices and is expertly written and very readable. You always abstain from using old React, e.g. you abstain from using class components, PropTypes, higher order components or lifecycle methods`;

export async function genKataFinal(
  {
    title,
    description,
  }: {
    title: string;
    description: string;
  },
  { openaiModel = DEFAULTS.OPENAI_MODEL, openaiProvider }: Config,
) {
  const result = await streamText({
    model: openaiProvider.chat(openaiModel),
    system: systemPrompt,
    prompt: getUserPrompt(title, description),
  });

  return result;
}
