import { Request, Response } from "express";
import { createRewardService } from "../../services";

const createRewardController = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const reward = await createRewardService({ name, description });

  return res.status(201).json(reward);
};

export default createRewardController;
