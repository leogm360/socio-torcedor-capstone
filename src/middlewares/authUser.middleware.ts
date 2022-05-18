import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import useError from "../hooks/useError";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  const { errAdmin, errAccess } = useError();

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) throw errAccess;

    jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
      (err: any, decoded: any) => {
        if (err) throw errAdmin;

        next();
      }
    );
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};
