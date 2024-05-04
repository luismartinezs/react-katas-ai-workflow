import { DeepPartial } from 'ai'
import { z } from 'zod'

/*
{
  outlineTitle: "outline title",
  items: [
    {
      title: "outline item 1",
      subitems: [
        {
          title: "subitem 1",
          description: "subitem description"
        },
        ...
      ]
    },
    ...
  ]
}
*/

export const outlineItemSchema = z.object(
  {
    title: z.string().describe("The title of the oputline item"),
    subitems: z.array(z.object({
      title: z.string().describe("The title of the subitem"),
      description: z.string().optional().describe("A description of the subitem in one short paragraph")
    }))
  }
).required({
  title: true
})

export const outlineSchema = z.object({
  outlineTitle: z.string().describe("The title of the outline"),
  items: z.array(outlineItemSchema).nonempty().describe("A list of outline items")
})
export type PartialOutline = DeepPartial<typeof outlineSchema>
