import { IPersonalInfo } from "@/personal-info/personal-info.types";


export interface IUser {
  email: string;
  password: string;
  personalInfo: IPersonalInfo;
  resumeId: string
}
