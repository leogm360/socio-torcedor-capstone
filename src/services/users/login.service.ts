import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { ILoginUser } from "../../interfaces/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUserService = async ({ email, userName, password }: ILoginUser) => {
  const { users } = useRepo();
  const { errNotFound, errAccess } = useError();

  const user = await users.findOne({
    where: [{ email }, { userName }],
  });

  if (!user) throw errNotFound;

  bcrypt.compare(password, user.password, (_, result) => {
    if (!result) throw errAccess;
  });

  const token = jwt.sign(
    { userEmail: user.email },
    process.env.JWT_SECRET as string
  );

  return token;
};

export default loginUserService;
