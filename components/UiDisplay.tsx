"use client";

import { AI } from "@/app/play/action";
import { useUIState } from "ai/rsc";
import DocuForm from "./DocuForm";
import { Section } from "./Section";
import { sectionTitle } from "@/lib/constants";

export function UiDisplay() {
  const [ui] = useUIState<typeof AI>();

  return (
    <div>
      {ui.length ? (
        ui.map((message: { id: number; component: React.ReactNode }) => (
          <div key={message.id}>{message.component}</div>
        ))
      ) : (
        <Section title={sectionTitle.docs}>
          <DocuForm />
        </Section>
      )}
    </div>
  );
}
