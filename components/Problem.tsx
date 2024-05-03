type ProblemProps = {};

const Problem = ({}: ProblemProps): React.JSX.Element => {
  return (
    <div className="bg-gray-800 p-10 text-center text-white">
      <h2 className="mb-4 text-4xl font-bold">
        Just by reading the docs you don't learn
      </h2>
      <p className="mb-6">
        With a new React or Next version every 5 seconds, it's hard to keep up :)
      </p>
      <div className="flex items-center justify-center space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl">😰</span>
          <span className="mt-2 text-sm">Full revamp of React API</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">😓</span>
          <span className="mt-2 text-sm">Struggle to keep up</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl">😡</span>
          <span className="mt-2 text-sm">Rage quit coding</span>
        </div>
      </div>
    </div>
  );
};

export { Problem };
