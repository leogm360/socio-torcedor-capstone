import { Request, Response } from "express";

import rewardCreateService from "../../services/rewards/create.service";

export const rewardCreateController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const reward = await rewardCreateService({ name, description });

    return res.status(201).json(reward);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};
