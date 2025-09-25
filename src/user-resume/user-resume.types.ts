import { ISection } from "../resume-section/resume-section.types";

export interface IResume {
  name: string;
  templateId: string;
  sections: ISection[];
}

export interface ITemplate {
  id?: string;
  name: string;
  style: string;
  resumes: IResume;
}
