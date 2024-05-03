import Link from 'next/link'

type HeroProps = {

}

const Hero = ({}: HeroProps): React.JSX.Element => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen py-4 px-4 max-w-4xl xl:p-0">
      {/* <span className="text-xs text-gray-300">Product of the day</span> */}
      <h1 className="mt-2 text-4xl font-bold text-center text-white">Get tons of AI-generated React katas</h1>
      <p className="mt-4 text-center text-gray-300">
        Get tons of custom AI-generated exercises to practice React coding skills. Simply enter the documentation that you want to learn as input and the AI will take care of the rest.
      </p>
      <Link href="/play" className="mt-6 px-6 py-2 bg-primary-500 text-black rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 font-bold">
        Start generating katas
      </Link>
    </div>
  );
};

export { Hero }
