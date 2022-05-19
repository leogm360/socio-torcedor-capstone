import { Request, Response } from "express";

import partnershipUpdateOneService from "../../services/partnerships/updateOne.service";

const partnershipUpdateController = async (req: Request, res: Response) => {
  try {
    const { partnership_id } = req.params;
    const { name, price, rewards_id } = req.body;

    const partnership = await partnershipUpdateOneService({
      partnership_id,
      name,
      price,
      rewards_id,
    });

    return res.status(201).send(partnership);
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
