import z from "zod"

export const updateUserProfileDto = z.object({
  fullName: z.string().min(1).max(100),
  email: z.email()
})