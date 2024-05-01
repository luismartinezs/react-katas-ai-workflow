import { env } from "@/env";
import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { Section } from "@/components/Section";
import { KataDisplay } from "@/components/KataDisplay";
import { sleep } from "@/lib/utils";
import { genKataFinal, mockFinal } from "./finalKataGen";
import { mockInitial } from "./initialKataGen";
import { mockReadme } from "./readmeGen";
import { experimental_generateText } from "ai";
import { DEFAULTS } from "@/lib/constants";
import { openaiProvider } from "@/lib/openai";

export * from "./initialKataGen";
export * from "./finalKataGen";
export * from "./readmeGen";

export async function genKata({
  uiStream,
  title,
  description,
  mock = false,
}: {
  uiStream: ReturnType<typeof createStreamableUI>;
  title: string;
  description: string;
  mock: boolean;
}) {
  const textStream = {
    final: createStreamableValue<string>(""),
    initial: createStreamableValue<string>(""),
    readme: createStreamableValue<string>(""),
  };
  const kataDisplaySection = (
    <Section title="Kata Display" separator={true}>
      <KataDisplay
        final={textStream.final.value}
        initial={textStream.initial.value}
        readme={textStream.readme.value}
      />
    </Section>
  );
  // build completed version of code
  // build initial version of code
  // build README

  if (mock) {
    await sleep(300);
    uiStream.update(
      <Section title="Kata Display" separator={true}>
        <KataDisplay
          final={mockFinal}
          initial={mockInitial}
          readme={mockReadme}
        />
      </Section>
    );
    uiStream.done();

    return {
      final: mockFinal,
      initial: mockInitial,
      readme: mockReadme,
    };
  }

  let generatedKata: {
    final: string;
    initial: string;
    readme: string;
  } = {
    final: "",
    initial: "",
    readme: "",
  };
  try {
    const finalStream = await genKataFinal(title, description);
    for await (const delta of finalStream.textStream) {
      if (delta) {
        if (generatedKata.final.length === 0 && delta.length > 0) {
          uiStream.update(kataDisplaySection);
        }

        generatedKata.final += delta;
        textStream.final.update(generatedKata.final);
      }
    }
    // web design
    // gen initial kata
    // gen readme
  } catch (err) {
    console.error(err);
    uiStream.update(<div>Error occurred while generating the kata.</div>);
  } finally {
    Object.values(textStream).forEach((s) => s.done());
    uiStream.done();
  }

  return generatedKata;
}