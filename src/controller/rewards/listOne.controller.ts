import { Request, Response } from "express";
import "express-async-errors";

import rewardListOneService from "../../services/rewards/listOne.service";

export const rewardListOneController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reward = await rewardListOneService(id);

    return res.status(200).json(reward);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};
