import { User } from "@prisma/client";
import { prisma } from "@/app";
import { IUser } from "./user.types";

export class UserService {

  createUser(user: IUser): Promise<User> {
    return prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        fullName: user.fullName
      }
    });
  }
}
