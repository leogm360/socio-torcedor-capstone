import { In } from "typeorm";
import { Reward } from "../../entities";
import useError from "../../hooks/useError";
import useRepo from "../../hooks/useRepo";
import { IUpdatePartnership } from "../../interfaces/partnership/index";

const partnershipUpdateOneService = async ({
  id,
  name,
  price,
  reward_id = undefined,
}: IUpdatePartnership) => {
  const { partnerships, rewards } = useRepo();
  const { errNotFound } = useError();

  const ListPartnerships = await partnerships.find();

  const account = ListPartnerships.find(
    (partnership) => partnership.id.toString() === id
  );

  if (!account) throw errNotFound;

  let listRewards: Reward[] = reward_id ? reward_id : account.rewards;
  if (reward_id !== undefined) {
    listRewards = await rewards.find({ where: { id: In(reward_id) } });
  }

  if (!listRewards) throw errNotFound;

  const newName = name ? name : account?.name;
  const newPrice = price ? price : account?.price;
  const newRewards = reward_id ? reward_id : account?.rewards;

  await partnerships.update(account!.id, {
    name: newName,
    price: newPrice,
    rewards: newRewards,
  });

  return true;
};

export default partnershipUpdateOneService;
