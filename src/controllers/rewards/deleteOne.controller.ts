import { Request, Response } from "express";
import { deleteOneRewardService } from "../../services";

const deleteOneRewardController = async (req: Request, res: Response) => {
  const { reward_id } = req.params;

  await deleteOneRewardService(reward_id);

  return res.status(204).json();
};

export default deleteOneRewardController;
