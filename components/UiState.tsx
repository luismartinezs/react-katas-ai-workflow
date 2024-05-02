"use client";

import { AI } from "@/app/play/action";
import { useUIState } from "ai/rsc";
import { Separator } from "./ui/separator";

const UiState = (): React.JSX.Element => {
  const [ui] = useUIState<typeof AI>();

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold">UI State</h2>
      <Separator />
      {ui.length > 0 ? (
        ui.map((message: { id: number; component: React.ReactNode }) => (
          <div key={message.id}>{message.component}</div>
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </div>
  );
};

export default UiState;
