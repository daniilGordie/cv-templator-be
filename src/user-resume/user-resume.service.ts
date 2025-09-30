import { Resume } from '@prisma/client';
import { IResume } from './user-resume.types';
import { prisma } from "@/app";

export class UserResumeService {
  getAllResumesForUser(userId: string): Promise<Resume[]> {
    return prisma.resume.findMany({ where: { userId: userId } });
  }

  getResumeById(id: string): Promise<Resume | null> {
    return prisma.resume.findUnique({
      where: { id: id },
      include: { sections: { include: { entries: true } } },
    });
  }

  createResume(userId: string, resume: IResume): Promise<Resume> {
    return prisma.resume.create({
      data: {
        userId,
        name: resume.name,
        sections: {
          create: resume.sections.map((section) => ({
            name: section.name,
            entries: {
              create: section.entries.map((entry) => ({
                title: entry.title,
                description: entry.description,
                startDate: entry.startDate,
                endDate: entry.endDate,
              })),
            },
          })),
        },
        templateId: resume.templateId,
      },
      include: { sections: { include: { entries: true } } },
    });
  }

  updateResume(id: string, resume: IResume): Promise<Resume> {
    return prisma.resume.update({
      where: { id },
      data: {
        name: resume.name,
        templateId: resume.templateId,
      },
    });
  }

  deleteResume(id: string): Promise<Resume> {
    return prisma.resume.delete({ where: { id: id } });
  }
}
