"use client";

import { PartialOutline } from "@/lib/schema/outline";
import { useId, useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { Button } from "./ui/button";
import { AI } from "@/app/action";

type OutlineProps = { outline: PartialOutline };

function checkedIdsToItems(
  checkedItem: string,
  outline: PartialOutline
): {
  item: string;
  subitem: string;
} {
  const [itemIndex, subitemIndex] = checkedItem.split("_").slice(1);
  const item = outline.items && outline.items[Number(itemIndex)];
  const itemLabel = item?.title || "";
  const subitem = item?.subitems && item.subitems[Number(subitemIndex)];

  return {
    item: itemLabel,
    subitem: subitem || "",
  };
}

const Outline = ({ outline }: OutlineProps): React.JSX.Element => {
  const { submitCheckedItems } = useActions();
  const titleId = useId();
  // State to keep track of checked items
  const [checkedItem, setCheckedItem] = useState<string>();
  const [messages, setMessages] = useUIState<typeof AI>();

  // Handler to toggle checkbox state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    if (checked) {
      setCheckedItem(name);
    }
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("🚀 ~ onSubmit ~ checkedItem:", checkedItem);
    if (!checkedItem) {
      return;
    }

    const response = await submitCheckedItems(
      checkedIdsToItems(checkedItem, outline)
    );
    if (!response) {
      console.error("No response from submitCheckedItems");
      return;
    }
    setMessages((prev) => [...prev, response]);
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby={titleId}
      className="flex flex-col gap-2 items-start"
    >
      <h3 className="text-lg font-bold" id={titleId}>
        {outline.outlineTitle}
      </h3>
      <ol className="list-decimal ml-4 space-y-2">
        {outline.items
          ?.filter((item) => item && item.title)
          .map((item, _idx) => (
            <li key={_idx}>
              <div className="mb-2">{item?.title}</div>
              <ul className="space-y-2">
                {item?.subitems?.map((subitem, _jdx) => {
                  const currentId = `cbx_${_idx}_${_jdx}`;
                  return (
                    <li key={currentId}>
                      <div className="flex items-center space-x-2">
                        <input
                          // should be radio
                          type="radio"
                          id={currentId}
                          name={currentId}
                          checked={checkedItem === currentId || false}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor={currentId}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {subitem}
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
      </ol>

      <Button type="submit" className="mt-2">
        Submit
      </Button>
    </form>
  );
};

export default Outline;
