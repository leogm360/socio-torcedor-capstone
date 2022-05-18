import { Request, Response } from "express";
import AppError from "../../errors";

export const updateOneRewardController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const reward = await updateOneRewardService(id);

    return res.status(201).json(reward);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};
