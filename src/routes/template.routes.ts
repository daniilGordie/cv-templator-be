import { Router, Request, Response, RouterOptions } from "express";
import { TemplateService } from "../template/template.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTemplateDto, templateParamsDto, updateTemplateDto } from "../template/template.dto";

const router = Router();

const templateService = new TemplateService();


router.get("/", authMiddleware, async (req: Request, res: Response) => {
  const templates = await templateService.getTemplates();
  
  res.json(templates);
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  const paramsValidation = templateParamsDto.safeParse(req.params);
  
  if (!paramsValidation.success) {
    return res.status(400).json({ message: paramsValidation.error.message });
  }
  
  const { id } = paramsValidation.data;
  
  const template = await templateService.getTemplateById(id);
  
  if (!template) {
    return res.status(404).json({ message: "Template not found" });
  }
  
  res.json(template);
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const validation = createTemplateDto.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ message: validation.error.message });
  }

  const template = await templateService.createTemplate(req.body);

  res.status(201).json(template);
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  const updateValidation = updateTemplateDto.safeParse(req.body);

  if (!updateValidation.success) {
    return res.status(400).json({ message: updateValidation.error.message });
  }

  const paramsValidation = templateParamsDto.safeParse(req.params);

  if (!paramsValidation.success) {
    return res.status(400).json({ message: paramsValidation.error.message });
  }

  const { id } = paramsValidation.data;

  const template = await templateService.updateTemplate(id, req.body);

  if (!template) {
    return res.status(404).json({ message: "Template not found" });
  }
  res.json(template);
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const paramsValidation = templateParamsDto.safeParse(req.params);

  if (!paramsValidation.success) {
    return res.status(400).json({ message: paramsValidation.error.message });
  }

  const { id } = paramsValidation.data;

  const template = await templateService.deleteTemplate(id);

  if (!template) {
    return res.status(404).json({ message: "Template not found" });
  }

  res.json(template);
});

export const templateRouter = router;
