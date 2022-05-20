import express from "express";
import { Request, Response, NextFunction } from "express";
import AppError from "./errors";

import appRoutes from "./routes";

const app = express();

app.use(express.json());

appRoutes(app);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json();
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
