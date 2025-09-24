import z from "zod"

export const createTemplateDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1500)
})

export const updateTemplateDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1500)
})

export const templateParamsDto = z.object({
  id: z.string().nonempty('Template id is required')
})