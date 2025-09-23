import { Router,Request, Response, RouterOptions } from "express";
import { TemplateService } from "./template.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTemplateDto } from "./template.dto";

const router = Router();

const templateService = new TemplateService();

router.post('/', authMiddleware, (req: Request, res: Response) => {
  const validation = createTemplateDto.safeParse(req.body)

  if (!validation.success) {
    return res.status(400).json({ message: validation.error})
  }  

  const template = templateService.createTemplate(req.body)
  res.status(201).json(template)
});

export const templateRouter = router;
