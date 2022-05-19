import { Request, Response } from "express";
import "express-async-errors";

import rewardListService from "../../services/rewards/list.service";

export const rewardListController = async (req: Request, res: Response) => {
  try {
    const rewards = await rewardListService();

    return res.status(200).json(rewards);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};
