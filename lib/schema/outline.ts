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

export const outlineSchema = z.object({
  items: z.object(
    {
      title: z.string(),
      items: z.array(z.object(
        {
          title: z.string(),
          subitems: z.array(z.string()).min(2).max(5).nonempty()
        }
      )).nonempty()
    }
  )
})
export type PartialOutline = DeepPartial<typeof outlineSchema>
