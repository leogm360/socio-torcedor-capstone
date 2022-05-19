import { Request, Response } from "express";

import rewardListOneService from "../../services/rewards/listOne.service";

export const rewardListOneController = async (req: Request, res: Response) => {
  const { reward_id } = req.params;

  try {
    const reward = await rewardListOneService(reward_id);

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
