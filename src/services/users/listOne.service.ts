import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const listMeUserService = async (user_id: string) => {
  const { users } = useRepo();
  const { errNotFound } = useError();

  const user = await users.findOneBy({ id: user_id });

  if (!user) throw errNotFound;

  return user;
};

export default listMeUserService;
