import { env } from "@/env";
import { DEFAULTS } from "@/lib/constants";
import { openaiProvider } from "@/lib/openai";
import { experimental_streamText } from "ai";

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

const getUserPrompt = (
  finalCode: string,
  initialCode: string,
  title: string,
  description: string
) => `Your task is to provide the content of a README file for a kata or exercise that React students need to solve. I provide next the title, the starting incomplete code that the students need to complete and the final completed code

Kata Title: ${title}

Starting code:

${initialCode}

Final code:

${finalCode}

The README should contain the following sections:

- Introduction: briefly but clearly explain what the kata is about, and what is the purpose, in a way that is easy to understand

- Learning Objectives: A list of learning objectives for this kata

- Getting Started: A series of steps to complete the kata. The steps should be informative as to guide the student, but not so specific as to provide all the answers and make trivialize the kata

- User Stories: A list of conditions that the completed version should fulfill

- Tips: Additional guidance and tips to help complete the kata

- Stretch Goals: Further things that the student can implement that go beyond the original solution and provide an extra challenge

- Notes: (optional section), additional information relevant to the kata that did not fit any of the other sections

Example of a README for a different kata:

# Planetary Data Fetcher

Welcome to the Planetary Data Fetcher kata! This exercise will help you understand how to utilize the \`useEffect\` hook in React to manage side effects such as data fetching.

In this kata, you will create a component that interacts with the Star Wars API (SWAPI) to fetch a list of planets and their details. You will implement functionality to display this list and manage the user's selection to show more detailed information about each planet.

## Learning Objectives:

- Use \`useEffect\` to perform side effects in your component.
- Understand how to fetch data from an API on component mount.
- Manage loading states in your component for a better user experience.
- Fetch and display detailed data based on user interaction and component state.

## Getting Started:

The starter code sets up the basic structure of the Planetary Data Fetcher component. Your task is to complete the component by implementing the following features:

1. Fetch the list of planets from 'https://swapi.dev/api/planets/' when the component mounts and populate the \`planets\` state.
2. Display a loading indicator while the planets are being fetched.
3. Handle user interaction to select a planet and fetch details for the selected planet from \`https://swapi.dev/api/planets/\${selectedPlanet}/\`.
4. Display a loading indicator while the planet details are being fetched.
5. Render the fetched planet details using the provided \`PlanetDetails\` component.

## User Stories:

- As a user, I should see a list of Star Wars planets loaded from the SWAPI when I first load the component.
- As a user, I should be able to select a planet from the list to view more details about it.
- As a user, I should see a loading indicator while the list of planets and the planet details are being fetched.

## Tips:

- Use the \`useState\` hook to manage the planets list, selected planet ID, planet details, and loading states.
- Use the \`useEffect\` hook to trigger side effects for data fetching.
- Consider edge cases such as error handling and empty states.
- Think about the user experience when implementing loading states.

## Stretch Goals:

- Implement pagination or infinite scrolling for the list of planets.
- Add error handling and display a message if the API request fails.
- Allow users to go back to the list after viewing details to select another planet.
- Abstract the fetch funtionality to a custom hook
- Avoid race conditions by implementing a solution similar to this: https://react.dev/reference/react/useEffect#fetching-data-with-effects

## Notes:

- In react, usually to fetch third party data over the network one would use a library such as [tanstack query](https://tanstack.com/query/latest)

Good luck, and may the force be with you as you tackle this React kata!

Now provide the README for the actual kata`;

const systemPrompt = `You are an expert React developer, specialized in teaching about React and writing documentation for learning exercises for students. You write easily readable, instructive and well-crafted text. You always use modern React. You always abstain from using old React, e.g. you abstain from using class components, PropTypes, higher order components or lifecycle methods`;

export async function genKataReadme(
  final: string,
  initial: string,
  title: string,
  description: string
) {
  const result = await experimental_streamText({
    model: openaiProvider.chat(env.OPENAI_API_MODEL || DEFAULTS.OPENAI_MODEL),
    system: systemPrompt,
    prompt: getUserPrompt(final, initial, title, description),
  });

  return result;
}
