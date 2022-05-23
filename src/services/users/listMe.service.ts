import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const listMeUserService = async (userEmail: string) => {
  const { users } = useRepo();
  const { errNotFound } = useError();

  const user = await users.findOneBy({ email: userEmail });

  if (!user) throw errNotFound;

  return user;
};

export default listMeUserService;
