import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const listOneUserService = async (user_id: string) => {
  const { users } = useRepo();
  const { errNotFound } = useError();

  const listUser = await users.find();

  const user = listUser.find((user) => user.id.toString() === user_id);

  if (!user) throw errNotFound;

  return user;
};

export default listOneUserService;
