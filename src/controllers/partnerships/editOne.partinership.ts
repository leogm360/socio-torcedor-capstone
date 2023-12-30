import { Request, Response } from "express";
import { editOnePartnershipService } from "../../services";

const editOnePartnershipController = async (req: Request, res: Response) => {
  const { partnership_id } = req.params;
  const { name, price, rewards_id } = req.body;

  const partnership = await editOnePartnershipService({
    partnership_id,
    name,
    price,
    rewards_id,
  });

  return res.status(201).json(partnership);
};

export default editOnePartnershipController;
