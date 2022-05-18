import { Request, Response } from "express";
import AppError from "../../errors";

export const listRewardsController = async (req: Request, res: Response) => {
  try {
    const rewards = await listRewardsService();

    return res.status(200).json(rewards);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};
