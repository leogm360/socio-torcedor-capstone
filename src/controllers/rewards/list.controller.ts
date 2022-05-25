import { Request, Response } from "express";
import { listRewardsService } from "../../services";

const listRewardsController = async (req: Request, res: Response) => {
  const rewards = await listRewardsService();

  return res.status(200).json(rewards);
};

export default listRewardsController;
