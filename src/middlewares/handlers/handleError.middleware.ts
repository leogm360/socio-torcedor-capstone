import { Request, Response, NextFunction } from "express";
import AppError from "../../errors";

const handeErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    const { statusCode, message } = err;

    return res.status(err.statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal server error",
  });
};

export default handeErrorMiddleware;
