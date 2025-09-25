import { Resume } from "@prisma/client"

export interface IUserProfile {
  fullName: string
  email: string
  resume: Resume[]
}