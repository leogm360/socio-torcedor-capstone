import { Request, Response } from "express";
import AppError from "../../errors";

export const createRewardController = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const reward = await createRewardService({ name, description });

    return res.status(201).json(reward);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};
