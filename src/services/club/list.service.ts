import useRepo from "../../hooks/useRepo";

const listClubsService = async () => {
  const { clubs } = useRepo();

  const listClubs = clubs.find();

  return listClubs;
};

export default listClubsService;
