"use client";

import { PartialKataIdeas } from "@/lib/schema/kataIdeas";
import { useState } from "react";
import { Button } from "./ui/button";

type KataIdeasProps = {
  ideas: PartialKataIdeas;
};

const KataIdeas = ({ ideas }: KataIdeasProps): React.JSX.Element => {
  const { ideas: ideasArray } = ideas;
  const [selected, setSelected] = useState<string>();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!ideasArray || !selected) {
      return;
    }

    console.log(ideasArray[+selected]);

    // TODO handle server action call
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelected(name);
    }
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
