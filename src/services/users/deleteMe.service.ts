import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const deleteMeUserService = async (userEmail: string) => {
  const { users } = useRepo();
  const { errNotFound, errServer } = useError();

  const user = await users.findOneBy({ email: userEmail });

  if (!user) throw errNotFound;

  const deleted = await users.delete({ email: userEmail });

  if (deleted) {
    return true;
  } else {
    throw errServer;
  }
};

export default deleteMeUserService;
