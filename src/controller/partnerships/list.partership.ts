import { Request, Response } from "express";
import AppError from "../../errors";
import partinershipsListService from "../../services/partnerships/list.service";

const partinershipListController = async (req: Request, res: Response) => {
  try {
    const partnership = await partinershipsListService();

    return res.json(partnership);
  } catch (err) {
    if (err instanceof AppError) {
      return new AppError(400, "");
    }
  }
};

export default partinershipListController;
