import useRepo from "../../hooks/useRepo";

const clubListService = async () => {
  const { clubs } = useRepo();

  const listClubs = clubs.find();

  return listClubs;
};

export default clubListService;
