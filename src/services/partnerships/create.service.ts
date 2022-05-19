import { In } from "typeorm";
import { Reward } from "../../entities";
import { Partnership } from "../../entities/partnership.entity";
import useError from "../../hooks/useError";
import useRepo from "../../hooks/useRepo";
import { ICreatePartnership } from "../../interfaces/partnership/index";

const partnershipCreateService = async ({
  name,
  price,
  reward_id,
}: ICreatePartnership) => {
  const { partnerships, rewards } = useRepo();
  const { errConflict } = useError();

  const partnershipAlreadyExists = await partnerships.findOneBy({ name: name });

  if (partnershipAlreadyExists) throw errConflict;

  let listRewards: Reward[] = [];
  if (reward_id !== undefined) {
    listRewards = await rewards.find({ where: { id: In(reward_id) } });
  }

  const partnership = new Partnership();
  partnership.name = name;
  partnership.price = price;
  partnership.rewards = listRewards;

  partnerships.create(partnership);
  partnerships.save(partnership);

  return partnership;
};

export default partnershipCreateService;
