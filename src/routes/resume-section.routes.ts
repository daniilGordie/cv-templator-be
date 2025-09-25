import { Router, Request, Response } from "express";
import { SectionService } from "@/resume-section/resume-section.service";
import { requireParam } from "@/middlewares/validateParams";

const router = Router();
const sectionService = new SectionService();

router.post("/resume/:resumeId/create-section", requireParam("resumeId"), async (req: Request, res: Response) => {
  
  const resumeId = req.params.resumeId as string;
  
  const section = await sectionService.createSection(resumeId, req.body);
  
  res.status(201).json(section);
});

router.put("/:sectionId", requireParam("sectionId"), async (req: Request, res: Response) => {
  
  const sectionId = req.params.sectionId as string;
  
  const section = await sectionService.updateSection(sectionId, req.body);
  
  if (!section) return res.status(404).json({ message: "Section not found" });
  
  res.json(section);
});

router.delete("/:sectionId", requireParam("sectionId"), async (req: Request, res: Response) => {
  
  const sectionId = req.params.sectionId as string;
  
  const deleted = await sectionService.deleteSection(sectionId);
  
  if (!deleted) return res.status(404).json({ message: "Section not found" });
  
  res.json(deleted);
});

export const sectionRouter = router;
