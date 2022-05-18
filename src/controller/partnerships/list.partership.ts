import { Request, Response } from "express";
import AppError from "../../errors";

const partinershipListController = async (req: Request, res: Response) => {
  try {
    const partnership = await partnershipListService();

    return res.json(partnership);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};
