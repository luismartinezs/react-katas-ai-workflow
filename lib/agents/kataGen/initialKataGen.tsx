import { Config } from "@/app/play/action";
import { env } from "@/env";
import { DEFAULTS } from "@/lib/constants";
import { streamText } from "ai";

export const mockInitial = `\`\`\`tsx
import { useState, useEffect } from 'react'

interface WindowSize {
  width: number
  height: number
}

export const useWindowSize = (): WindowSize => {
  // TODO: Initialize state with the current window size
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0, // Placeholder, replace with actual window size initialization
    height: 0, // Placeholder, replace with actual window size initialization
  })

  // TODO: Implement handleResize to update the state with new window dimensions
  const handleResize = () => {
    // Your code here to set new window size
  }

  useEffect(() => {
    // TODO: Set up the event listener for window resize
    // Your code here to add window resize event listener
    // Cleanup function to remove the event listener
    return () => {
      // Your code here to remove window resize event listener
    }
  }, []) // Ensure this effect runs only once

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
  finalKata: string,
  title: string,
  description: string,
) => `This is a completed version of a React code:

${finalKata}

Your task is to provide an initial and incomplete version that the student needs to solve.

To determine what parts of the code to omit for the student to complete, take into consideration the description of the exercise:

Title: ${title}

Description:
${description}

Add comments with "// TODO:" where the student needs to complete the code. The student should add a significant part of the code, at least 4 or 5 lines of code. Provide only the code, written within a code block.`;

const systemPrompt = `You are an expert React developer, specialized in teaching about React and creating coding exercises for students to learn React. You wisely and intelligently leave parts of the code blank so that when students fill them in, they optimize their learning. You always abstain from using old React, e.g. you abstain from using class components, PropTypes, higher order components or lifecycle methods`;

export async function genKataInitial(
  {
    finalKata,
    title,
    description,
  }: {
    finalKata: string;
    title: string;
    description: string;
  },
  { openaiModel = DEFAULTS.OPENAI_MODEL, openaiProvider }: Config,
) {
  const result = await streamText({
    model: openaiProvider.chat(openaiModel),
    system: systemPrompt,
    prompt: getUserPrompt(finalKata, title, description),
  });

  return result;
}
