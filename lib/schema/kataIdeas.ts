import { DeepPartial } from 'ai';
import { z } from 'zod'

export const kataIdeaSchema = z.object({
  title: z.string(),
  description: z.string()
});

export const kataIdeasSchema = z.object({
  ideas: z.array(kataIdeaSchema).length(3).describe("List of 3 kata ideas")
});

export type PartialKataIdeas = DeepPartial<typeof kataIdeasSchema>;
