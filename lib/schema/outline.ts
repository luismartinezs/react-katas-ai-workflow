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
    title: z.string(),
    subitems: z.array(z.string()).nonempty()
  }
).required({
  title: true
})

export const outlineSchema = z.object({
  outlineTitle: z.string(),
  items: z.array(outlineItemSchema)
})
export type PartialOutline = DeepPartial<typeof outlineSchema>
// export type OutlineItem = typeof outlineItemSchema
