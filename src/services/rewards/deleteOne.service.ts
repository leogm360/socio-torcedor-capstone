import useRepo from "../../hooks/useRepo";
import useError from "../../hooks/useError";

const rewardDeleteOneService = async (reward_id: String) => {
  const { rewards } = useRepo();
  const { errNotFound } = useError();

  const listRewards = await rewards.find();

  const club = listRewards.find((reward) => reward.id.toString() === reward_id);

  if (!club) throw errNotFound;

  await rewards.delete(club!.id);

  return true;
};

export default rewardDeleteOneService;
