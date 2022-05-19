import { Request, Response } from "express";

import rewardUpdateOneService from "../../services/rewards/updateOne.service";

const rewardUpdateOneController = async (req: Request, res: Response) => {
  try {
    const { reward_id } = req.params;
    const { name, description } = req.body;

    const reward = await rewardUpdateOneService({
      reward_id,
      name,
      description,
    });

    return res.status(201).send(reward);
  } catch (err: any) {
    const { statusCode, message } = err;

    return res.status(statusCode).send({
      status: "err",
      statusCode,
      message,
    });
  }
};

export default rewardUpdateOneController;
