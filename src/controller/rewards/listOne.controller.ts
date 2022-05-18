import { Request, Response } from "express";
import AppError from "../../errors";

export const listOneRewardController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reward = await listOneRewardService(id);

    return res.status(200).json(reward);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};
