import { Router, Request, Response } from "express";
import { createUserDto } from "@/common/user.dto";
import { updateUserProfileDto } from "@/user-profile/user-profile.dto";
import { UserService } from "@/common/user.service";
import { UserProfileService } from "@/user-profile/user-profile.service";
import { UserResumeService } from "@/user-resume/user-resume.service";
import { requireParam } from "@/middlewares/validateParams";

const router = Router();
const userService = new UserService();
const userProfileService = new UserProfileService();
const userResumeService = new UserResumeService();

router.use("/:userId", requireParam("userId"))

router.get("/:userId", async (req: Request, res: Response) => {

  const userId = req.params.userId as string;
  
  const profile = await userProfileService.getMyProfileById(userId);
  
  res.json(profile);
});
   
router.post("/create-user", async (req: Request, res: Response) => {
  
  const validation = createUserDto.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(400).json({ message: validation.error.message });
  }
  
  const user = await userService.createUser(req.body);
  
  res.status(201).json(user);
});

router.put("/:userId", async (req: Request, res: Response) => {
  
  const userId = req.params.userId as string;
  
  const validation = updateUserProfileDto.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(400).json({ message: validation.error.message });
  }
  
  const updated = await userProfileService.updateMyProfile(userId, req.body);
  
  if (!updated) return res.status(404).json({ message: "User not found" });
  
  res.json(updated);
});

router.delete("/:userId", async (req: Request, res: Response) => {
  
  const userId = req.params.userId as string;
  
  const deleted = await userProfileService.deleteMyProfile(userId);
  
  if (!deleted) return res.status(404).json({ message: "User not found" });
  
  res.json(deleted);
});

router.get("/:userId/resumes", async (req: Request, res: Response) => {
  
  const userId = req.params.userId as string;
  
  const resumes = await userResumeService.getAllResumesForUser(userId);
  
  res.json(resumes);
});

router.post("/:userId/create-resume",  async (req: Request, res: Response) => {
  
  const userId = req.params.userId as string;
  
  const resume = await userResumeService.createResume(userId, req.body);
  
  res.status(201).json(resume);
});

export const userRouter = router;

