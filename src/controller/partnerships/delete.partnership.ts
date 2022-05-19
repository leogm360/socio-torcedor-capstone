import { Request, Response } from "express";
import AppError from "../../errors";
import partnershipDeleteOneService from "../../services/partnerships/deleteOne.service";

const partnershipDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const partnership = await partnershipDeleteOneService(id);

    return res
      .status(200)
      .json({ message: "partnership deleted with sucess!" });
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(401, "");
    }
  }
};

export default partnershipDeleteController;
