import { Request, Response } from "express";
import { deleteOnePartnershipService } from "../../services";

const deleteOnePartnershipController = async (req: Request, res: Response) => {
  const { partnership_id } = req.params;

  await deleteOnePartnershipService(partnership_id);

  return res.status(204).json();
};

export default deleteOnePartnershipController;
