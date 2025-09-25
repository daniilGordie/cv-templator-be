import { Router } from "express";
import { resumeRouter } from "./user-resume.routes";
import { userRouter } from "./user.routes"
import { sectionRouter } from "./resume-section.routes";

const router = Router();
router.use("/user", userRouter)
router.use("/resumes", resumeRouter)
router.use("/sections", sectionRouter)

export default router;
