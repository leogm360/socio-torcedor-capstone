import useRepo from "../../hooks/useRepo";

const listUsersService = async () => {
  const { users } = useRepo();

  const allUsers = await users.find();

  return allUsers;
};

export default listUsersService;
