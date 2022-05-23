import useRepo from "../../hooks/useRepo";
import { IEditUserMe } from "../../interfaces/users";

const editMeUserService = async ({ userEmail, toEdit }: IEditUserMe) => {
  const { users } = useRepo();

  const user = await users.findOneBy({ email: userEmail });

  const updatedUser = await users.save({ ...user, ...toEdit });

  return updatedUser;
};

export default editMeUserService;
