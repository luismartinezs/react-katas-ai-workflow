import { ChatMessages } from "@/components/ChatMessages";
import DocuForm from "@/components/DocuForm";
import { Section } from "@/components/Section";
import { Stepper } from "@/components/Stepper";

export default function Play() {
  return (
    <div className="container mx-auto flex max-w-5xl flex-col px-4 py-16 md:p-24">
      <Stepper />
      <Section title="Documentation">
        <DocuForm />
      </Section>
      <ChatMessages />
    </div>
  );
}
