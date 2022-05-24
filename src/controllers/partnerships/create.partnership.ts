import { Request, Response } from "express";
import { createPartnershipService } from "../../services";

const createPartnershipController = async (req: Request, res: Response) => {
  const { name, price, rewards_id } = req.body;

  const partnership = await createPartnershipService({
    name,
    price,
    rewards_id,
  });

  return res.status(201).json(partnership);
};

export default createPartnershipController;
