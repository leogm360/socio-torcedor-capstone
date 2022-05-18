import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const clubListOneService = async (club_id: String) => {
  const { clubs } = useRepo();
  const { errNotFound } = useError();

  const listClubs = await clubs.find();

  const club = listClubs.find((club) => club.id.toString() === club_id);

  if (!club) throw errNotFound;

  return club;
};

export default clubListOneService;
