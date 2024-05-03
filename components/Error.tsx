"use client";

import { useActions, useUIState } from "ai/rsc";
import { Button } from "./ui/button";
import { AI } from "@/app/play/action";

type ErrorProps = {
  message: string;
};

const Error = ({ message }: ErrorProps): React.JSX.Element => {
  const { softReset } = useActions();
  const [_, setUi] = useUIState<typeof AI>();

  async function handleClick() {
    const result = await softReset();
    setUi([result]);
  }

  return (
    <div>
      <div>{message}</div>
      <Button onClick={handleClick}>Start again</Button>
    </div>
  );
};

export { Error };
