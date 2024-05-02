type HeroProps = {

}

const Hero = ({}: HeroProps): React.JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      {/* <span className="text-xs text-gray-300">Product of the day</span> */}
      <h1 className="mt-2 text-4xl font-bold text-center text-white">Get tons of AI-generated React katas</h1>
      <p className="mt-4 text-center text-gray-300">
        Get tons of custom AI-generated exercises to practice React coding skills. Simply enter the documentation that you want to learn as input and the AI will take care of the rest.
      </p>
      <a href="/play" className="mt-6 px-6 py-2 bg-accent-500 text-black rounded-md hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-50">
        Start generating katas
      </a>
      <div className="flex items-center mt-4">
      </div>
    </div>
  );
};

export { Hero }
