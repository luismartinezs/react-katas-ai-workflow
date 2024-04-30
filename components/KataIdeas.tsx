import { PartialKataIdeas } from "@/lib/schema/kataIdeas";

type KataIdeasProps = {
  ideas: PartialKataIdeas;
};

const KataIdeas = ({ ideas }: KataIdeasProps): React.JSX.Element => {
  const { ideas: ideasArray } = ideas;

  if (!ideasArray) {
    return (
      <div className="text-center text-gray-500 text-sm">
        No kata ideas available.
      </div>
    );
  }

  if (!ideasArray || ideasArray.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm">
        No kata ideas available.
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg mt-5 shadow-lg">
      {ideasArray.filter(Boolean).map((idea, index) => (
        <div
          key={index}
          className="border-b border-gray-700 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
        >
          <h3 className="text-lmd text-white font-semibold mb-2">
            {idea!.title}
          </h3>
          {/* TODO this decription should be rendered as markdown. the morphic project has something wired up */}
          <p className="text-sm text-gray-300">{idea!.description}</p>
        </div>
      ))}
    </div>
  );
};

export { KataIdeas };
