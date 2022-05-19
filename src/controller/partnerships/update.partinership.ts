import { Request, Response } from "express";

import partnershipUpdateOneService from "../../services/partnerships/updateOne.service";

const partnershipUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, reward_id } = req.body;

    const partnership = await partnershipUpdateOneService({
      id,
      name,
      price,
      reward_id,
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

export default partnershipUpdateController;
