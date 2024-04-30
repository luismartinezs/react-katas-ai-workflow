import { DeepPartial } from 'ai'
import { z } from 'zod'

/*
{
  outlineTitle: "outline title",
  items: [
    {
      title: "outline item 1",
      subitems: [
        "subitem 1", "subitem 2", "subitem 3"
      ]
    }
  ]
}
*/

export const outlineItemSchema = z.object(
  {
    title: z.string().describe("The title of the oputline item"),
    subitems: z.array(z.string()).nonempty().describe("A list of subitems for the outline item")
  }
).required({
  title: true
})

export const outlineSchema = z.object({
  outlineTitle: z.string().describe("The title of the outline"),
  items: z.array(outlineItemSchema).nonempty().describe("A list of outline items")
})
export type PartialOutline = DeepPartial<typeof outlineSchema>
