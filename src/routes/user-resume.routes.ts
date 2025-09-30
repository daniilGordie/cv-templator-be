import { Router, Request, Response } from "express";
import { UserResumeService } from "@/user-resume/user-resume.service";
import { requireParam } from "@/middlewares/validateParams";

const router = Router();
const userResumeService = new UserResumeService();

router.get("/:resumeId", requireParam("resumeId"), async (req: Request, res: Response) => {
  
  const resumeId = req.params.resumeId as string;
  
  const resume = await userResumeService.getResumeById(resumeId);
  
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  
  res.json(resume);
});



router.put("/update-general-info/:resumeId", requireParam("resumeId"), async (req: Request, res: Response) => {
  
  const resumeId = req.params.resumeId as string;
  
  const updated = await userResumeService.updateResume(resumeId, req.body);
  
  if (!updated) return res.status(404).json({ message: "Resume not found" });
  
  res.json(updated);
});

router.delete("/:resumeId", requireParam("resumeId"), async (req: Request, res: Response) => {
  
  const resumeId = req.params.resumeId as string;
  
  const deleted = await userResumeService.deleteResume(resumeId);
  
  if (!deleted) return res.status(404).json({ message: "Resume not found" });
  
  res.json(deleted);
});

export const resumeRouter = router;
