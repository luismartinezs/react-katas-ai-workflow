"use client";

import { PartialKataIdeas } from "@/lib/schema/kataIdeas";
import { useState } from "react";
import { Button } from "./ui/button";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "@/app/action";

type KataIdeasProps = {
  ideas: PartialKataIdeas;
};

const KataIdeas = ({ ideas }: KataIdeasProps): React.JSX.Element => {
  const { ideas: ideasArray } = ideas;
  const [selected, setSelected] = useState<string>();
  const { submitKataIdea } = useActions();
  const [messages, setMessages] = useUIState<typeof AI>();

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

    const result = await submitKataIdea({
      title,
      description,
    });
    setMessages((prev) => [...prev, result]);
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
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-800 rounded-lg mt-5 shadow-lg"
    >
      {ideasArray.filter(Boolean).map((idea, index) => {
        const id = `kata-idea-${index}`;
        return (
          <div
            onClick={() => handleClick(index)}
            key={index}
            className="border-b border-gray-700 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
          >
            <div className="flex gap-2 items-center justify-start">
              <input
                type="radio"
                id={id}
                name={index.toString()}
                checked={selected === index.toString() || false}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label
                className="text-lmd text-white font-semibold mb-2"
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
      <Button type="submit" className="mt-2">
        Submit
      </Button>
    </form>
  );
};

export { KataIdeas };
