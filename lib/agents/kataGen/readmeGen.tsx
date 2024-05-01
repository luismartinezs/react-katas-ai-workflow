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
