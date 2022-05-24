import useRepo from "../../hooks/useRepo";
import { IEditUserOne } from "../../interfaces/users";

const editOneUserService = async ({ user_id, toEdit }: IEditUserOne) => {
  const { users } = useRepo();

  const user = await users.findOneBy({ id: user_id });

  const updatedUser = await users.save({ ...user, ...toEdit });

  return updatedUser;
};

export default editOneUserService;
