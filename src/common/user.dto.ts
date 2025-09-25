import z from "zod"

export const createUserDto = z.object({
  fullName: z.string().min(1).max(100),
  email: z.email(),
  password: z.string().nonempty()
})