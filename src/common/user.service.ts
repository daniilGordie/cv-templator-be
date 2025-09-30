import { User } from "@prisma/client";
import { prisma } from "@/app";
import { IUser } from "./user.types";

export class UserService {
  createUser(user: IUser): Promise<User> {
    return prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        personalInfo: {
          create: {
            firstName: user.personalInfo.firstName,
            secondName: user.personalInfo.secondName ?? null,
            phoneNumber: user.personalInfo.phoneNumber ?? null,
            homeTown: user.personalInfo.homeTown ?? null,
            dateOfBirth: new Date(user.personalInfo.dateOfBirth),
          },
        },
      },
    });
  }
}
