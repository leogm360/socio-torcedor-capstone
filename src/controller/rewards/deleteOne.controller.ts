import { Request, Response } from "express";
import AppError from "../../errors";

export const deleteOneRewardController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const reward = await deleteOneRewardService(id);

    return res.status(204).json(reward);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};
