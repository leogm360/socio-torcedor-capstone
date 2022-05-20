import { Request, Response } from "express";
import AppError from "../../errors";
import partinershipsListService from "../../services/partnerships/list.service";

const partinershipListController = async (req: Request, res: Response) => {
  try {
    const partnership = await partinershipsListService();

    return res.json(partnership);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};

export default partinershipListController;
