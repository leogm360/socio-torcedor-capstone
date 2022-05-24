import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const listOneRewardService = async (reward_id: String) => {
  const { rewards } = useRepo();
  const { errNotFound } = useError();

  const listRewards = await rewards.find();

  const reward = listRewards.find(
    (reward) => reward.id.toString() === reward_id
  );

  if (!reward) throw errNotFound;

  return reward;
};

export default listOneRewardService;
