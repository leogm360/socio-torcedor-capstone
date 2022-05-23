import { Request, Response } from "express";

import partnershipCreateService from "../../services/partnerships/create.service";

const partnershipCreateController = async (req: Request, res: Response) => {
  try {
    const { name, price, rewards_id } = req.body;

    const partnership = await partnershipCreateService({
      name,
      price,
      rewards_id,
    });

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

export default partnershipCreateController;
