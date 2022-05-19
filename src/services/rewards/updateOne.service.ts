import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";
import { IRewardUpdate } from "../../interfaces/rewards";

const rewardUpdateOneService = async ({
  reward_id,
  name,
  description,
}: IRewardUpdate) => {
  const { rewards } = useRepo();
  const { errNotFound, errConflict } = useError();

  const listRewards = await rewards.find();

  const reward = listRewards.find(
    (reward) => reward.id.toString() === reward_id
  );

  if (!reward) throw errNotFound;

  const RewardAlreadyExists = await rewards.findOneBy({
    name: name,
  });

  if (RewardAlreadyExists && name !== reward.name && name !== undefined)
    throw errConflict;

  reward.name = name ? name : reward.name;
  reward.description = description ? description : reward.description;

  await rewards.update(reward!.id, {
    name: reward.name,
    description: reward.description,
  });

  return reward;
};

export default rewardUpdateOneService;
