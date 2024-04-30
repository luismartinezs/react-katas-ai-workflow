import { DeepPartial } from 'ai';
import { z } from 'zod'

export const kataIdeaSchema = z.object({
  title: z.string(),
  description: z.string()
});

export const kataIdeasSchema = z.array(kataIdeaSchema);

export type PartialKataIdeas = DeepPartial<typeof kataIdeasSchema>;
