"use client";

// import AiState from "@/components/AiState";
// import { OpenaiKeyDialog } from "@/components/OpenaiKeyDialog";
import { Stepper } from "@/components/Stepper";
import { UiDisplay } from "@/components/UiDisplay";

export default function Play() {
  return (
    <div className="container mx-auto flex max-w-5xl flex-col px-4 py-16 md:p-24">
      {/* <div className="relative">
        <OpenaiKeyDialog />
      </div> */}
      <Stepper />
      <UiDisplay />
      {/* <AiState /> */}
    </div>
  );
}
