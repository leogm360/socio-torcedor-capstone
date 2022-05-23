import { Request, Response, NextFunction } from "express";
import useError from "../../hooks/useError";
import useRepo from "../../hooks/useRepo";

const checkUserExistsMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const {
    userEmail,
    params: { user_id },
    body: { email },
  } = req;

  const { users } = useRepo();
  const { errNotFound } = useError();

  const userExists = await users.findOneBy(
    email ? { email } : userEmail ? { email: userEmail } : { id: user_id }
  );

  if (!userExists) throw errNotFound;

  return next();
};

export default checkUserExistsMiddleware;
