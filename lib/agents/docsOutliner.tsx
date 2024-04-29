import { createStreamableUI, createStreamableValue } from "ai/rsc";
import { PartialOutline } from "../schema/outline";
import { ExperimentalMessage } from "ai";
import { Section } from "@/components/Section";

const OutlineSkeleton = (): React.JSX.Element => {
  return <div></div>;
};

export async function docsOutliner(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: ExperimentalMessage[]
) {
  const objectStream = createStreamableValue<PartialOutline>();
  uiStream.update(
    <Section title="Outline" separator={true}>
      <OutlineSkeleton />
    </Section>
  );
}
