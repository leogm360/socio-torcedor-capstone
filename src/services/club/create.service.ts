import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { IClubCreate } from "../../interfaces/club";
import { Club } from "../../entities";

const clubCreateService = async ({ name }: IClubCreate) => {
  const { clubs } = useRepo();
  const { errConflict } = useError();

  const ClubAlreadyExists = await clubs.findOneBy({
    name: name,
  });
  if (ClubAlreadyExists) throw errConflict;

  const newClub = new Club();
  newClub.name = name;

  clubs.create(newClub);
  await clubs.save(newClub);

  return newClub;
};

export default clubCreateService;
