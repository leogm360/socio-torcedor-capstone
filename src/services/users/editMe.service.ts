import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { IEditUserMe } from "../../interfaces/users";

const editMeUserService = async ({ userEmail, toEdit }: IEditUserMe) => {
  const { users } = useRepo();
  const { errConflict, errNotFound } = useError();

  if (toEdit.name || toEdit.userName || toEdit.email) {
    const userExists = await users.findOne({
      where: [
        { name: toEdit.name },
        { userName: toEdit.userName },
        { email: toEdit.email },
      ],
    });

    if (userExists) throw errConflict;
  }

  const user = await users.findOneBy({ email: userEmail });

  if (!user) throw errNotFound;

  await users.save({ ...user, ...toEdit });

  return await users.findOneBy(
    toEdit.email ? { email: toEdit.email } : { email: userEmail }
  );
};

export default editMeUserService;
