import z from "zod"

export const createUserDto = z.object({
  email: z.email(),
  password: z.string().nonempty()
})