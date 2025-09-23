import z from "zod"

export const createTemplateDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1, 'Text is required!').max(1500)
})