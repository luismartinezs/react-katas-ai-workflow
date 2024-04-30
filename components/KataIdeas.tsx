import { PartialKataIdeas } from "@/lib/schema/kataIdeas";

type KataIdeasProps = {
  ideas: PartialKataIdeas;
};

const KataIdeas = ({ ideas }: KataIdeasProps): React.JSX.Element => {
  if (!ideas || ideas.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm">
        No kata ideas available.
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg mt-5">
      {ideas.filter(Boolean).map((idea, index) => (
        <div
          key={index}
          className="border-b border-gray-300 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
        >
          <h3 className="text-lg text-gray-900 font-semibold">{idea!.title}</h3>
          <p className="text-sm text-gray-600">{idea!.description}</p>
        </div>
      ))}
    </div>
  );
};

export { KataIdeas };
