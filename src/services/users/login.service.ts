import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { ILoginUser } from "../../interfaces/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginUserService = async ({ email, userName, password }: ILoginUser) => {
  const { users } = useRepo();
  const { errNotFound, errAccess } = useError();

  const user = await users
    .createQueryBuilder("users")
    .addSelect("users.password AS users_password")
    .where({ email })
    .orWhere({ userName })
    .getOne();

  if (!user) throw errNotFound;

  const compare = await bcrypt.compare(password, user.password);

  if (!compare) throw errAccess;

  const token = jwt.sign(
    { userEmail: user.email },
    process.env.JWT_SECRET as string
  );

  return token;
};

export default loginUserService;
