import useRepo from "../../hooks/useRepo";
import { IUpdateUserOne } from "../../interfaces/users";

const editOneUserService = async ({ user_id, ...toUpdate }: IUpdateUserOne) => {
  const { users } = useRepo();

  const user = await users.findOneBy({ id: user_id });

  const updatedUser = await users.save({ ...user, ...toUpdate });

  return updatedUser;
};

export default editOneUserService;
