import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const deleteMeUserService = async (user_id: string) => {
  const { users } = useRepo();
  const { errNotFound, errServer } = useError();

  const user = await users.findOneBy({ id: user_id });

  if (!user) throw errNotFound;

  const deleted = await users.delete({ id: user_id });

  if (deleted) {
    return true;
  } else {
    throw errServer;
  }
};

export default deleteMeUserService;
