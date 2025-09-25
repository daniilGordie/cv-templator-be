import { User } from "@prisma/client";
import { prisma } from "@/app";
import { IUser } from "../common/user.types";

export class UserProfileService {

  getMyProfileById(id: string): Promise<User | null> {
    return prisma.user.findUnique({where: {id: id}})
  }

  updateMyProfile(id: string, user: IUser): Promise<User> {
    return prisma.user.update({
      where: { id: id },
      data: user,
    });
  }

  deleteMyProfile(id: string): Promise<User> {
    return prisma.user.delete({where: {id: id}})
  }
}
