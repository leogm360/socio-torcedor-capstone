import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { ICreateUser } from "../../interfaces/users";

const createUserService = async ({
  name,
  user_name,
  email,
  password,
  age,
  gender,
  phone,
  address,
  club_id,
  partnership_id,
  is_adm,
}: ICreateUser) => {
  const { users, addresses, clubs, partnerships } = useRepo();
  const { errNotFound, errConflict } = useError();

  const hasUser = await users.findOneBy({ name });

  if (hasUser) throw errConflict;

  const hasAddress = await addresses.findOneBy({
    zip_code: address.zip_code,
    street: address.street,
    number_house: address.number_house,
  });

  const userAddress = hasAddress ? hasAddress : addresses.create(address);

  const hasClub = await clubs.findOneBy({ id: club_id });

  const hasPartnership = await partnerships.findOneBy({ id: partnership_id });

  if (!hasClub || !hasPartnership) throw errNotFound;

  const newUser = users.create({
    name,
    user_name,
    email,
    password,
    age,
    gender,
    phone,
    address: userAddress,
    club: hasClub,
    partnership: hasPartnership,
    is_adm,
  });

  await users.save(newUser);

  const { password: removed, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
};

export default createUserService;
