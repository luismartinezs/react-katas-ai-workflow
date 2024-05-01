import { env } from "@/env";
import { createOpenAI } from "@ai-sdk/openai";
import { createStreamableUI } from "ai/rsc";
import { sleep } from "../utils";
import { Section } from "@/components/Section";
import { KataDisplay } from "@/components/KataDisplay";

export const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const mockFinal = `import { useState, useEffect } from 'react'

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
`;

export const mockInitial = `import { useState, useEffect } from 'react'

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
`;
export const mockReadme = `# Building a Custom useWindowSize Hook

Welcome to the "Building a Custom useWindowSize Hook" kata! This exercise is designed to help you understand how to effectively use the \`useEffect\` hook in React to handle browser events such as window resizing.

In this kata, you will create a custom React hook named \`useWindowSize\` that listens for window resize events and provides the current window dimensions (width and height) to any component that utilizes this hook. The goal is to dynamically track and display the window size, updating it on each resize event.

## Learning Objectives:

- Use the \`useEffect\` hook to handle side effects related to window resizing.
- Learn to clean up side effects in React components using the cleanup function of \`useEffect\`.
- Manage and update state in response to browser window events.
- Implement custom hooks in React for reusable logic across components.

## Getting Started:

To complete this kata, follow these steps to incrementally build and refine your solution:

1. Initialize the \`windowSize\` state within the \`useWindowSize\` hook to store the current window dimensions.
2. Implement the \`handleResize\` function to update the \`windowSize\` state when the window is resized.
3. Set up an event listener for the window \`resize\` event inside a \`useEffect\` hook and ensure you clean it up to prevent memory leaks.
4. Return the current window size from the \`useWindowSize\` hook so it can be used by components.
5. Utilize the \`useWindowSize\` hook in the \`WindowSize\` component to display the current width and height of the window.

## User Stories:

- As a user, I should see the current window width and height displayed on the screen.
- As a user, when I resize the browser window, the displayed dimensions should update accordingly without refreshing the page.

## Tips:

- Ensure your event listener is correctly set up and removed by including it in the \`useEffect\` cleanup function.
- Use the provided \`WindowSize\` component structure to display the window size; focus on getting the hook logic correct.
- Remember to test your component by resizing the browser window to see if the dimensions update as expected.

## Stretch Goals:

- Enhance the \`useWindowSize\` hook to debounce or throttle the resize events to optimize performance.
- Create additional hooks for other window-related events, such as scroll position or visibility state.
- Implement features in the display component to show different messages or styles based on certain window size thresholds.

## Notes:

This kata is focused on understanding and using React hooks effectively, particularly \`useEffect\` for managing side effects. Pay special attention to the cleanup of effects, as this is crucial for avoiding bugs and memory leaks in React applications.

Start coding, have fun, and learn to manage browser events effectively in your React apps!`;

async function genKataFinal(
  uiStream: ReturnType<typeof createStreamableUI>,
  prompt: string
) {}

async function genKataInitial() {
  //
}

async function genReadme() {
  //
}

async function webDesigner(code: string) {
  //
}

export async function genKata({
  uiStream,
  title,
  description,
  mock = false,
}: {
  uiStream: ReturnType<typeof createStreamableUI>;
  title: string;
  description: string;
  mock: boolean;
}) {
  // build completed version of code
  // build initial version of code
  // build README

  if (mock) {
    await sleep(300);
    uiStream.update(
      <Section title="Kata Display" separator={true}>
        <KataDisplay
          final={mockFinal}
          initial={mockInitial}
          readme={mockReadme}
        />
      </Section>
    );
    uiStream.done();

    return {
      final: mockFinal,
      initial: mockInitial,
      readme: mockReadme,
    };
  }

  //
}
