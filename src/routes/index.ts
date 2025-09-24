import { Router } from "express";
import { templateRouter } from "./template.routes";

const router = Router();
router.use("/templates", templateRouter);

export default router;
