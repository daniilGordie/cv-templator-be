import { Request, Response, NextFunction } from "express";

export const requireParam = (param: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.params[param]) {
      return res.status(400).json({message: `${param} is required`})
    }
    next()
  }
}