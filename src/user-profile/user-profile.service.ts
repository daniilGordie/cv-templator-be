import { User } from "@prisma/client";
import { prisma } from "@/app";

export class UserProfileService {

  getMyProfileById(id: string): Promise<User | null> {
    return prisma.user.findUnique({where: {id: id}})
  }

  deleteMyProfile(id: string): Promise<User> {
    return prisma.user.delete({where: {id: id}})
  }
}
