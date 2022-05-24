import { Request, Response } from "express";
import { editOneRewardService } from "../../services";

const editOneRewardController = async (req: Request, res: Response) => {
  const {
    body: { name, description },
    params: { reward_id },
  } = req;

  const reward = await editOneRewardService({
    reward_id,
    name,
    description,
  });

  return res.status(201).send(reward);
};

export default editOneRewardController;
