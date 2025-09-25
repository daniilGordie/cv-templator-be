import { Section } from "@prisma/client";
import { ISection } from "./resume-section.types";
import { prisma } from "@/app";

export class SectionService {
  createSection(resumeId: string, section: ISection): Promise<Section> {
    return prisma.section.create({
      data: {
        resumeId,
        name: section.name,
        entries: {
          create: section.entries.map((entry) => ({
            title: entry.title,
            description: entry.description,
            startDate: entry.startDate,
            endDate: entry.endDate,
          })),
        },
      },
    });
  }

  updateSection(id: string, section: ISection): Promise<Section> {
    return prisma.section.update({
      where: { id },
      data: {
        name: section.name,
      },
    });
  }

  deleteSection(id: string): Promise<Section> {
    return prisma.section.delete({ where: { id: id } });
  }
}
