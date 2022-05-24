import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { IRewardCreate } from "../../interfaces/rewards";
import { Reward } from "../../entities";

const createRewardService = async ({ name, description }: IRewardCreate) => {
  const { rewards } = useRepo();
  const { errConflict } = useError();

  const RewardAlreadyExists = await rewards.findOneBy({
    name: name,
  });
  if (RewardAlreadyExists) throw errConflict;

  const newReward = new Reward();
  newReward.name = name;
  newReward.description = description;

  rewards.create(newReward);
  rewards.save(newReward);

  return newReward;
};

export default createRewardService;
