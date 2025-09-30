import { Router, Request, Response } from "express";
import { createUserDto } from "@/common/user.dto";
import { UserService } from "@/common/user.service";
import { UserProfileService } from "@/user-profile/user-profile.service";
import { UserResumeService } from "@/user-resume/user-resume.service";
import { requireParam } from "@/middlewares/validateParams";
import { updatePersonalInfoDto } from "@/personal-info/personal-info.dto";
import { PersonalInfoService } from "@/personal-info/personal-info.service";

const router = Router();
const userService = new UserService();
const userProfileService = new UserProfileService();
const userResumeService = new UserResumeService();
const personalInfoService = new PersonalInfoService();

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

router.delete("/:userId", async (req: Request, res: Response) => {
  
  const userId = req.params.userId as string;
  
  const deleted = await userProfileService.deleteMyProfile(userId);
  
  if (!deleted) return res.status(404).json({ message: "User not found" });
  
  res.json(deleted);
});

router.put("/:userId/update-personal-info", async (req: Request, res: Response) => {
  
  const userId = req.params.userId as string;
  
  const validation = updatePersonalInfoDto.safeParse(req.body);
  
  if (!validation.success) {
    return res.status(400).json({ message: validation.error.message });
  }
  
  const info = await personalInfoService.updatePersonalInfo(userId, req.body);
  
  if (!info) return res.status(404).json({ message: "Resume not found" });
  
  res.json(info);
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

