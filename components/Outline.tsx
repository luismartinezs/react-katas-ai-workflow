"use client";

import { PartialOutline } from "@/lib/schema/outline";

type OutlineProps = { outline: PartialOutline };

const Outline = ({ outline }: OutlineProps): React.JSX.Element => {
  return (
    <div>
      <h1>{outline.outlineTitle}</h1>
      <ul>
        {outline.items
          ?.filter((item) => item && item.title)
          .map((item, _idx) => (
            <li key={_idx}>
              {item?.title}
              <ul>
                {item?.subitems?.map((subitem) => (
                  <li key={subitem}>{subitem}</li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Outline;
