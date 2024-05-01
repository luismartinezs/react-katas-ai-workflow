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

