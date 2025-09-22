import { Router, Request, Response, NextFunction } from "express";

const indexRouter = Router();

/* GET home page. */
indexRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("📣 GET / — Home route hit"); 
  res.render("index", { title: "Express" });
});

export default indexRouter;
