import { In } from "typeorm";
import { Reward } from "../../entities";
import useError from "../../hooks/useError";
import useRepo from "../../hooks/useRepo";
import { IUpdatePartnership } from "../../interfaces/partnership/index";

const editOnePartnershipService = async ({
  partnership_id,
  name,
  price,
  rewards_id,
}: IUpdatePartnership) => {
  const { partnerships, rewards } = useRepo();
  const { errNotFound, errConflict } = useError();

  const listPartnerships = await partnerships.find();

  const partnership = listPartnerships.find(
    (partnership) => partnership.id.toString() === partnership_id
  );

  if (!partnership) throw errNotFound;

  let listRewards: Reward[] = partnership.rewards;
  if (rewards_id !== undefined) {
    listRewards = await rewards.find({ where: { id: In(rewards_id) } });
    if (listRewards.length !== rewards_id.length) throw errNotFound;
  }

  const partnershipAlreadyExists = await partnerships.findOneBy({
    name: name,
  });

  if (
    partnershipAlreadyExists &&
    name !== partnership.name &&
    name !== undefined
  )
    throw errConflict;

  partnership.name = name ? name : partnership.name;
  partnership.price = price ? price : partnership.price;
  partnership.rewards = listRewards;

  await partnerships.save(partnership);

  return partnership;
};

export default editOnePartnershipService;
