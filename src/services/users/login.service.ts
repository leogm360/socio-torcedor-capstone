import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { ILoginUser } from "../../interfaces/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUserService = async ({ email, user_name, password }: ILoginUser) => {
  const { users } = useRepo();
  const { errNotFound, errAccess } = useError();

  const user = await users.findOne({ where: [{ email }, { user_name }] });

  if (!user) throw errNotFound;

  bcrypt.compare(password, user.password, (_, result) => {
    if (!result) throw errAccess;
  });

  const token = jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET);

  return token;
};

export default loginUserService;
