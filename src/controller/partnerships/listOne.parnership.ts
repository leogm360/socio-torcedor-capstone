import { Request, Response } from "express";
import AppError from "../../errors";

const partnershipListOneController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const partnership = await partnershipListOneService(id);

    return res.status(201).json(partnership);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(401, "");
    }
  }
};
