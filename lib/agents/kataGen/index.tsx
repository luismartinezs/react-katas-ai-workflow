import { env } from "@/env";
import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { Section } from "@/components/Section";
import { KataDisplay } from "@/components/KataDisplay";
import { sleep } from "@/lib/utils";
import { genKataFinal, mockFinal } from "./finalKataGen";
import { genKataInitial, mockInitial } from "./initialKataGen";
import { genKataReadme, mockReadme } from "./readmeGen";
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
    <Section title="New Kata" separator={true}>
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
      <Section title="New Kata" separator={true}>
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
    const initialStream = await genKataInitial(
      generatedKata.final,
      title,
      description
    );
    for await (const delta of initialStream.textStream) {
      if (delta) {
        if (generatedKata.initial.length === 0 && delta.length > 0) {
          uiStream.update(kataDisplaySection);
        }

        generatedKata.initial += delta;
        textStream.initial.update(generatedKata.initial);
      }
    }
    // gen readme
    const readmeStream = await genKataReadme(
      generatedKata.final,
      generatedKata.readme,
      title,
      description
    );
    for await (const delta of readmeStream.textStream) {
      if (delta) {
        if (generatedKata.readme.length === 0 && delta.length > 0) {
          uiStream.update(kataDisplaySection);
        }

        generatedKata.readme += delta;
        textStream.readme.update(generatedKata.readme);
      }
    }
  } catch (err) {
    console.error(err);
    uiStream.update(<div>Error occurred while generating the kata.</div>);
  } finally {
    Object.values(textStream).forEach((s) => s.done());
    uiStream.done();
  }

  return generatedKata;
}
