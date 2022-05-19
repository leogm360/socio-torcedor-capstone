import { Request, Response } from "express";
import AppError from "../../errors";
import partnershipListOneService from "../../services/partnerships/listOne.service";

const partnershipListOneController = async (req: Request, res: Response) => {
  try {
    const { partnership_id } = req.params;

    const partnership = await partnershipListOneService(partnership_id);

    return res.status(201).json(partnership);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};

export default partnershipListOneController;
