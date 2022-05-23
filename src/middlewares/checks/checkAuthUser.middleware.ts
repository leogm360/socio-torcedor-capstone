import { Request, Response, NextFunction } from "express";

import useError from "../../hooks/useError";
import jwt from "jsonwebtoken";

const checkAuthUserMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { errToken } = useError();

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw errToken;

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) throw errToken;

      req.userEmail = decoded.userEmail;

      return next();
    }
  );
};

export default checkAuthUserMiddleware;
