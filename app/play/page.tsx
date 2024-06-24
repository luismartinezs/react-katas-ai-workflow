"use client";

// import AiState from "@/components/AiState";
import { OpenaiKeyDialog } from "@/components/OpenaiKeyDialog";
import { Stepper } from "@/components/Stepper";
import { UiDisplay } from "@/components/UiDisplay";
import { useIsClient } from "usehooks-ts";

export default function Play() {
  const isClient = useIsClient();
  return (
    <div className="container mx-auto flex max-w-5xl flex-col px-4 py-16 md:p-24">
      <div className="relative">
        {isClient && <OpenaiKeyDialog /> }
      </div>
      <Stepper />
      <UiDisplay />
      {/* <AiState /> */}
    </div>
  );
}
