import { PersonalInfo} from "@prisma/client";
import { prisma } from "@/app";
import { IPersonalInfo } from "./personal-info.types";

export class PersonalInfoService {
  updatePersonalInfo(id: string, personalInfo: IPersonalInfo): Promise<PersonalInfo> {
    return prisma.personalInfo.update({
      where: { userId: id },
      data: {
        firstName: personalInfo.firstName,
        secondName: personalInfo.secondName,
        phoneNumber: personalInfo.phoneNumber,
        homeTown: personalInfo.homeTown,
        dateOfBirth: personalInfo.dateOfBirth,
      },
    });
  }
}
