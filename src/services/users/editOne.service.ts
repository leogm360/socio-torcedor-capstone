import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { IEditUserOne } from "../../interfaces/users";

const editOneUserService = async ({ user_id, toEdit }: IEditUserOne) => {
  const { users } = useRepo();
  const { errConflict, errNotFound } = useError();

  if (!!toEdit.name || !!toEdit.userName || !!toEdit.email) {
    const userExists = await users.findOne({
      where: [
        { name: toEdit.name },
        { userName: toEdit.userName },
        { email: toEdit.email },
      ],
    });

    if (userExists) throw errConflict;
  }

  const user = await users.findOneBy({ id: user_id });

  if (!user) throw errNotFound;

  await users.save({ ...user, ...toEdit });

  return await users.findOneBy({ id: user_id });
};

export default editOneUserService;
