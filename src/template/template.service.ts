import { Template } from "@prisma/client";
import { ITemplate } from "./template.types";
import { prisma } from "@/app";

export class TemplateService {
  getTemplates(): Promise<Template[]> {
    return prisma.template.findMany();
  }

  getTemplateById(id: string): Promise<Template | null> {
    return prisma.template.findUnique({where: {id: id}})
  }

  createTemplate(template: ITemplate): Promise<Template> {
    return prisma.template.create({
      data: template,
    });
  }

  updateTemplate(id: string, template: ITemplate): Promise<Template> {
    return prisma.template.update({
      where: { id: id },
      data: {
        title: template.title,
        description: template.description,
      },
    });
  }

  deleteTemplate(id: string): Promise<Template> {
    return prisma.template.delete({where: {id: id}})
  }
}
