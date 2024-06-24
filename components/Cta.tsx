import Link from "next/link";

type CtaProps = {};

const Cta = ({}: CtaProps): React.JSX.Element => {
  return (
    <div
      className="relative flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1598518619776-eae3f8a34eac?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-50" />

      {/* Content */}
      <div className="z-10 flex flex-col items-center justify-center text-center">
        <h1 className="mb-4 text-5xl font-bold">
          Be practicing React within 2 minutes
        </h1>
        <p className="mb-8">
          Don&apos;t waste time thinking about exercises to practice React skills. Just input the part of the docs you want and get them
        </p>
        <Link href="/play" className="rounded bg-primary-600 px-6 py-2 font-bold text-black hover:bg-primary-700">
          Start generating katas!
        </Link>
      </div>
    </div>
  );
};

export { Cta };
