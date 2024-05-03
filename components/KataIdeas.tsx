"use client";

import { PartialKataIdeas } from "@/lib/schema/kataIdeas";
import { useState } from "react";
import { Button } from "./ui/button";
import { useAIState, useActions, useUIState } from "ai/rsc";
import { WandSparkles } from "lucide-react";
import { AI } from "@/app/play/action";

type KataIdeasProps = {
  ideas: PartialKataIdeas;
};

const KataIdeas = ({ ideas }: KataIdeasProps): React.JSX.Element => {
  const { ideas: ideasArray } = ideas;
  const [selected, setSelected] = useState<string>();
  const { submitKataIdea } = useActions();
  const [_, setUi] = useUIState<typeof AI>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ideasArray || !selected) {
      return;
    }

    const selectedIdea = ideasArray[+selected];

    if (!selectedIdea) {
      return;
    }

    const title = selectedIdea.title;
    const description = selectedIdea.description;

    const result = await submitKataIdea(
      {
        title,
        description,
      },
      selected,
    );
    setUi([result]);
  };

  const handleClick = (index: number) => {
    setSelected(index.toString());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSelected(event.target.name);
  };

  if (!ideasArray) {
    return (
      <div className="text-center text-sm text-gray-500">
        No kata ideas available.
      </div>
    );
  }

  if (!ideasArray || ideasArray.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500">
        No kata ideas available.
      </div>
    );
  }

  return (
    <div>
      <p>Pick one of the ideas about which to generate the kata</p>
      <form
        onSubmit={handleSubmit}
        className="mt-5 rounded-lg bg-gray-800 p-4 shadow-lg"
      >
        {ideasArray.filter(Boolean).map((idea, index) => {
          const id = `kata-idea-${index}`;
          return (
            <div
              onClick={() => handleClick(index)}
              key={index}
              className="mb-4 border-b border-gray-700 pb-4 last:mb-0 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-start gap-2">
                <input
                  type="radio"
                  id={id}
                  name={index.toString()}
                  checked={selected === index.toString() || false}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <label
                  className="text-lmd mb-2 font-semibold text-white"
                  htmlFor={id}
                >
                  {idea!.title}
                </label>
              </div>
              {/* TODO this decription should be rendered as markdown. the morphic project has something wired up */}
              <p className="text-sm text-gray-300">{idea!.description}</p>
            </div>
          );
        })}
        <div className="mt-2 flex w-full justify-end">
          <Button type="submit">
            Generate kata!&nbsp;
            <WandSparkles size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export { KataIdeas };
