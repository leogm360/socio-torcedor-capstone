import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { ICreateUser } from "../../interfaces/users";

const createUserService = async ({
  name,
  userName,
  email,
  password,
  age,
  gender,
  phone,
  address,
  clubId,
  partnershipId,
  isAdm = false,
}: ICreateUser) => {
  const { users, clubs, partnerships } = useRepo();
  const { errNotFound, errConflict } = useError();

  const user = await users.findOneBy({ name });

  if (user) throw errConflict;

  const club = await clubs.findOneBy({ id: clubId });

  const partnership = await partnerships.findOneBy({ id: partnershipId });

  if (!club || !partnership) throw errNotFound;

  const newUser = users.create({
    name,
    userName,
    email,
    password,
    age,
    gender,
    phone,
    address,
    club,
    partnership,
    isAdm,
  });

  await users.save(newUser);

  return await users.findOneBy({ id: newUser.id });
};

export default createUserService;
