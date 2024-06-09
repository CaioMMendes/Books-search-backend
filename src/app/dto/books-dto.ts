import z from "zod"

export const bookSchema = z.object({
  title: z.string(),
  isbn: z.string(),
  pageCount: z.number(),
  publishedDate: z
    .object({
      $date: z.date(),
    })
    .optional(),
  thumbnailUrl: z.string(),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  status: z.string(),
  authors: z.array(z.string()),
  categories: z.array(z.string()),
})

export type BookDto = z.infer<typeof bookSchema>
