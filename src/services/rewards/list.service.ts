import useRepo from "../../hooks/useRepo";

const rewardListService = async () => {
  const { rewards } = useRepo();

  const listRewards = rewards.find();

  return listRewards;
};

export default rewardListService;
