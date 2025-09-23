import express, { NextFunction, Request, Response } from "express";
import { templateRouter } from "./template/template.controller";
import dotenv from "dotenv";
import path from "path";
import { poolPromise } from "./db";

dotenv.config();

const app = express();

app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "pug");

async function main() {
  app.use(express.json());

  app.use("/api/templates", templateRouter);

  app.get("/template", (req: Request, res: Response) => {
    res.render("template", {
      template: {
        title: "Title",
        description: "Description",
      },
    });
  });

  poolPromise.then(pool => {
  if (pool) {
    pool.request()
      .query("SELECT 1 AS test")
      .then(result => console.log("DB test query result:", result.recordset))
      .catch(err => console.error("DB test query failed", err));
  }
});

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

main();

export default app;


