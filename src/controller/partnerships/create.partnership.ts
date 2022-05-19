import { Request, Response } from "express";
import AppError from "../../errors";
import partnershipCreateService from "../../services/partnerships/create.service";

const partnershipCreateController = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    const partnership = await partnershipCreateService({ name, price });

    return res.status(201).json(partnership);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};

export default partnershipCreateController;
