import { In } from "typeorm";
import { Reward } from "../../entities";
import { Partnership } from "../../entities";
import useError from "../../hooks/useError";
import useRepo from "../../hooks/useRepo";
import { ICreatePartnership } from "../../interfaces/partnership/index";

const createPartnershipService = async ({
  name,
  price,
  rewards_id,
}: ICreatePartnership) => {
  const { partnerships, rewards } = useRepo();
  const { errConflict, errNotFound } = useError();

  const partnershipAlreadyExists = await partnerships.findOneBy({ name: name });

  if (partnershipAlreadyExists) throw errConflict;

  let listRewards: Reward[] = [];
  if (rewards_id !== undefined) {
    listRewards = await rewards.find({ where: { id: In(rewards_id) } });
    if (listRewards.length !== rewards_id.length) throw errNotFound;
  }

  const newPartnership = new Partnership();
  newPartnership.name = name;
  newPartnership.price = price;
  newPartnership.rewards = listRewards;

  partnerships.create(newPartnership);
  await partnerships.save(newPartnership);

  return newPartnership;
};

export default createPartnershipService;
