import { Request, Response } from "express";

import partnershipDeleteOneService from "../../services/partnerships/deleteOne.service";

const partnershipDeleteController = async (req: Request, res: Response) => {
  try {
    const { partnership_id } = req.params;

    const partnership = await partnershipDeleteOneService(partnership_id);

    return res.status(200).send({});
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};

export default partnershipDeleteController;
