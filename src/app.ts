import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import routes from "./routes";
import cors from "cors";

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

async function main() {
  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:4200",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );

  app.use("/api", routes);

  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({
      message: "Not  found",
    });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something gets wrong");
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export default app;
