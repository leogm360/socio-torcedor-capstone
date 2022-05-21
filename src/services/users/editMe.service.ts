import useRepo from "../../hooks/useRepo";
import { IUpdateUserMe } from "../../interfaces/users";

const editOneUserService = async ({ userEmail, toUpdate }: IUpdateUserMe) => {
  const { users } = useRepo();

  const user = await users.findOneBy({ email: userEmail });

  const updatedUser = await users.save({ ...user, ...toUpdate });

  return updatedUser;
};

export default editOneUserService;
