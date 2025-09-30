import z from "zod"

export const updatePersonalInfoDto = z.object({
  firstName: z.string().min(1, "First name is required"),
  secondName: z.string().optional(),
  phoneNumber: z.string().optional(),
  homeTown: z.string().optional(),
})