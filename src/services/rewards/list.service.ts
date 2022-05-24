import useRepo from "../../hooks/useRepo";

const listRewardsService = async () => {
  const { rewards } = useRepo();

  const listRewards = rewards.find();

  return listRewards;
};

export default listRewardsService;
