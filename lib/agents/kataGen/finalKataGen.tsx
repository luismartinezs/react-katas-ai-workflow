import { KataDisplay } from "@/components/KataDisplay";
import { env } from "@/env";
import { DEFAULTS } from "@/lib/constants";
import { openaiProvider } from "@/lib/openai";
import { experimental_generateText, experimental_streamText } from "ai";
import { createStreamableUI } from "ai/rsc";

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

export const WindowSize = (): React.JSX.Element => {
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

const getUserPrompt = (title:string, description:string) => (`I'm gonna implement this kata:

Title: ${title}

Description: ${description}

First, I'm going to provide a coding style that I want you to use:

interface Props {
  // Add props here
}

export const SampleComponent = (props: Props): React.JSX.Element => {
  return (
    <div>
      {/* Add your code here */}
    </div>
  );
};

Only add props if needed.

The tech stack is: React 18, tailwind, typescript.

Your task is to create the final, completed and solved version of the code for a "kata" that  serves to practice the above topic.

Keep the code self contained, avoid using third party libraries, or mock them.

Provide only the component, written within a code block.`)

const systemPrompt = `You are a extremely skillful senior React developer, specialized in crafting optimal functional components using modern state-of-the-art React. Your code always follows best coding practices and is expertly written and very readable. You always abstain from using old React, e.g. you abstain from using class components, PropTypes, higher order components or lifecycle methods`

export async function genKataFinal(
  title: string,
  description: string,
) {
  const result = await experimental_streamText({
    model: openaiProvider.chat(env.OPENAI_API_MODEL || DEFAULTS.OPENAI_MODEL),
    system: systemPrompt,
    prompt: getUserPrompt(
      title,
      description
    ),
  })

  return result
}