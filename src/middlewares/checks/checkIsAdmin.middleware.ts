import { Request, Response, NextFunction } from "express";
import useError from "../../hooks/useError";
import useRepo from "../../hooks/useRepo";

const checkIsAdminMiddleware = async (
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
  const { errAdmin } = useError();

  const user = await users.findOneBy(
    email ? { email } : userEmail ? { email: userEmail } : { id: user_id }
  );

  if (!user?.isAdm) throw errAdmin;

  return next();
};

export default checkIsAdminMiddleware;
