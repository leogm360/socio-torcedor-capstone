import { Request, Response } from "express";
import "express-async-errors";

import rewardDeleteOneService from "../../services/rewards/deleteOne.service";

export const rewardDeleteOneController = async (
  req: Request,
  res: Response
) => {
  try {
    const { reward_id } = req.params;

    const reward = await rewardDeleteOneService(reward_id);

    return res.status(204);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};
