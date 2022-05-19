import { In } from "typeorm";
import { Reward } from "../../entities";
import { Partnership } from "../../entities/partnership.entity";
import useError from "../../hooks/useError";
import useRepo from "../../hooks/useRepo";
import { ICreatePartnership } from "../../interfaces/partnership/index";

const partnershipCreateService = async ({
  name,
  price,
  rewards_id,
}: ICreatePartnership) => {
  const { partnerships, rewards } = useRepo();
  const { errConflict } = useError();

  const partnershipAlreadyExists = await partnerships.findOneBy({ name: name });

  if (partnershipAlreadyExists) throw errConflict;

  let listRewards: Reward[] = [];
  if (rewards_id !== undefined) {
    listRewards = await rewards.find({ where: { id: In(rewards_id) } });
  }

  const newPartnership = new Partnership();
  newPartnership.name = name;
  newPartnership.price = price;
  newPartnership.rewards = listRewards;

  partnerships.create(newPartnership);
  await partnerships.save(newPartnership);

  return newPartnership;
};

export default partnershipCreateService;
