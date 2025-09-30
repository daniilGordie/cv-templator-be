  import { Resume } from "@prisma/client"

  export interface IUserProfile {
    email: string
    password: string
    resume: Resume[]
  }