import { Request, Response } from "express";
import { listOnePartnershipService } from "../../services";

const listOnePartnershipController = async (req: Request, res: Response) => {
  const { partnership_id } = req.params;

  const partnership = await listOnePartnershipService(partnership_id);

  return res.status(200).json(partnership);
};

export default listOnePartnershipController;
