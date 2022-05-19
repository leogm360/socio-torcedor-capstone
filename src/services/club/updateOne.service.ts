import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { IClubUpdate } from "../../interfaces/club";

const clubUpdateOneService = async ({ club_id, name }: IClubUpdate) => {
  const { clubs } = useRepo();
  const { errNotFound, errConflict } = useError();

  const listClubs = await clubs.find();

  const club = listClubs.find((club) => club.id.toString() === club_id);

  if (!club) throw errNotFound;

  const ClubAlreadyExists = await clubs.findOneBy({
    name: name,
  });

  console.log(ClubAlreadyExists);

  if (ClubAlreadyExists) throw errConflict;

  await clubs.update(club!.id, { name: name });

  club.name = name;

  return club;
};

export default clubUpdateOneService;
