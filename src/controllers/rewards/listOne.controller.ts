import { Request, Response } from "express";
import { listOneRewardService } from "../../services";

const listOneRewardController = async (req: Request, res: Response) => {
  const { reward_id } = req.params;

  const reward = await listOneRewardService(reward_id);

  return res.status(200).json(reward);
};

export default listOneRewardController;
