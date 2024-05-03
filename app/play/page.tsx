"use client"

import { Stepper } from "@/components/Stepper";
import { UiDisplay } from "@/components/UiDisplay";

export default function Play() {
  return (
    <div className="container mx-auto flex max-w-5xl flex-col px-4 py-16 md:p-24">
      <Stepper />
      <UiDisplay />
    </div>
  );
}
